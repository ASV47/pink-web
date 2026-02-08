terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.0.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.0.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = ">= 4.0.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

# -------------------------
# Variables
# -------------------------
variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

variable "app_name" {
  type    = string
  default = "hipink-frontend"
}

variable "env_name" {
  type    = string
  default = "hipink-frontend-prod"
}

# لازم تكون owner/repo
variable "github_repo" {
  type    = string
  default = "Codeikoo/HiPink-ClientSide"
}

variable "github_branch" {
  type    = string
  default = "main"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "environment_type" {
  type    = string
  default = "SingleInstance" # أو LoadBalanced
}

# -------------------------
# Random suffix (avoid name collisions)
# -------------------------
resource "random_id" "suffix" {
  byte_length = 3
}

locals {
  cname_prefix       = "${var.env_name}-${random_id.suffix.hex}"
  deploy_bucket_name = "${var.app_name}-deploy-${random_id.suffix.hex}"
}

# -------------------------
# S3 bucket for deployment artifacts (private)
# -------------------------
resource "aws_s3_bucket" "deploy" {
  bucket        = local.deploy_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "deploy" {
  bucket = aws_s3_bucket.deploy.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "deploy" {
  bucket                  = aws_s3_bucket.deploy.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -------------------------
# Elastic Beanstalk IAM (EC2 role + instance profile)
# -------------------------
data "aws_iam_policy_document" "eb_ec2_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eb_ec2_role" {
  name               = "${var.app_name}-eb-ec2-role"
  assume_role_policy = data.aws_iam_policy_document.eb_ec2_assume.json
}

resource "aws_iam_role_policy_attachment" "eb_webtier" {
  role       = aws_iam_role.eb_ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "eb_ec2_profile" {
  name = "${var.app_name}-eb-ec2-profile"
  role = aws_iam_role.eb_ec2_role.name
}

# -------------------------
# Elastic Beanstalk Service Role (optional but recommended)
# -------------------------
data "aws_iam_policy_document" "eb_service_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["elasticbeanstalk.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eb_service_role" {
  name               = "${var.app_name}-eb-service-role"
  assume_role_policy = data.aws_iam_policy_document.eb_service_assume.json
}

resource "aws_iam_role_policy_attachment" "eb_enhanced_health" {
  role       = aws_iam_role.eb_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth"
}

# -------------------------
# Elastic Beanstalk App + Environment (Node.js 20 on AL2023)
# -------------------------
resource "aws_elastic_beanstalk_application" "app" {
  name        = var.app_name
  description = "HiPink Frontend (Node.js) deployed via GitHub Actions + Terraform"
}

data "aws_elastic_beanstalk_solution_stack" "node20" {
  most_recent = true
  # مهم: Stack Node.js 20 (Amazon Linux 2023)
  name_regex = "64bit Amazon Linux 2023.*Node\\.js 20"
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = local.cname_prefix
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = data.aws_elastic_beanstalk_solution_stack.node20.name
  cname_prefix        = local.cname_prefix

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = var.environment_type
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = var.instance_type
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.eb_ec2_profile.name
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = aws_iam_role.eb_service_role.name
  }

  # Env vars
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NODE_ENV"
    value     = "production"
  }
}

# -------------------------
# GitHub OIDC (Use existing provider if already created in your account)
# -------------------------
# لو الـ provider موجود عندك بالفعل (زي ما حصل قبل كده) استخدم data:
data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

# لو مش موجود عندك، ساعتها امسح data فوق وحط resource بدلها (قولي وأنا أديك النسخة)

data "aws_iam_policy_document" "gha_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:ref:refs/heads/${var.github_branch}"]
    }
  }
}

resource "aws_iam_role" "gha_deploy" {
  name               = "${var.app_name}-gha-deploy"
  assume_role_policy = data.aws_iam_policy_document.gha_assume.json
}

data "aws_iam_policy_document" "gha_policy" {
  # Upload app bundle to deploy bucket
  statement {
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.deploy.arn]
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject"
    ]
    resources = ["${aws_s3_bucket.deploy.arn}/*"]
  }

  # Elastic Beanstalk deploy permissions
  statement {
    effect = "Allow"
    actions = [
      "elasticbeanstalk:CreateApplicationVersion",
      "elasticbeanstalk:UpdateEnvironment",
      "elasticbeanstalk:DescribeApplications",
      "elasticbeanstalk:DescribeApplicationVersions",
      "elasticbeanstalk:DescribeEnvironments",
      "elasticbeanstalk:DescribeEvents"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "gha_inline" {
  name   = "${var.app_name}-gha-inline"
  role   = aws_iam_role.gha_deploy.id
  policy = data.aws_iam_policy_document.gha_policy.json
}

# -------------------------
# Outputs
# -------------------------
output "app_url" {
  value = "http://${aws_elastic_beanstalk_environment.env.cname}"
}

output "deploy_bucket" {
  value = aws_s3_bucket.deploy.bucket
}

output "eb_app_name" {
  value = aws_elastic_beanstalk_application.app.name
}

output "eb_env_name" {
  value = aws_elastic_beanstalk_environment.env.name
}

output "gha_role_arn" {
  value = aws_iam_role.gha_deploy.arn
}
