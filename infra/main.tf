provider "aws" {
  region = "eu-central-1" # يمكنك تغييره حسب منطقتك
}

# 1. إنشاء الـ S3 Bucket
resource "aws_s3_bucket" "angular_bucket" {
  bucket = "hipink-frontend-app-unique-name" # غير هذا الاسم ليكون فريداً عالمياً
}

# 2. إعدادات الموقع الثابت (Static Website)
resource "aws_s3_bucket_website_configuration" "angular_config" {
  bucket = aws_s3_bucket.angular_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html" # مهم جداً لـ Angular Routing
  }
}

# 3. إعداد الوصول الآمن (CloudFront OAC)
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# 4. توزيع CloudFront
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.angular_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "S3-Angular-App"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Angular-App"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # مهم للتعامل مع Angular Routes عند عمل Refresh
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# 5. سياسة الوصول للـ S3 (تسمح لـ CloudFront فقط بالقراءة)
resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.angular_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.angular_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}