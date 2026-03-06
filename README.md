
# DevOps Technical Test

Stack:
- Terraform
- Azure VM
- Docker Compose
- Nginx Reverse Proxy
- React Frontend
- Golang Backend
- GitHub Actions CI/CD

## Deploy Infra

cd terraform

az login
terraform init
terraform apply

## Run locally

docker compose up -d --build

## Access

http://VM_PUBLIC_IP
