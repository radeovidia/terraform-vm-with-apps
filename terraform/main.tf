
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "demo-devops-rg"
  location = "Southeast Asia"
}
