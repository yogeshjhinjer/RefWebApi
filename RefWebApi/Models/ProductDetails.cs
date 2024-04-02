using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RefWebApi.Models
{
    public class ProductDetails: IDateTimeSort, IProductType
    {
        public int id { get; set; }
        public string productName { get; set; }
        public int productType { get; set; }
        public string productQuantity { get; set; }
        public string purchaseDate { get; set; }
        public string productTypeDescription { get; set; }
        public string expiryDate { get; set; }

        public List<ProductDetails> GetProductList()
        {
            List<ProductDetails> list = new List<ProductDetails>();

            list.Add(new ProductDetails() { id = 1, productName="Apple", productType = 1, productTypeDescription = ProductTypeText(1), productQuantity="3", purchaseDate= DateTimeString(DateTime.Now), expiryDate = ExpiryDate(DateTime.Now,1) });
            list.Add(new ProductDetails() { id = 2, productName = "Banana", productType = 1, productTypeDescription = ProductTypeText(1), productQuantity = "3", purchaseDate = DateTimeString(DateTime.Now), expiryDate = ExpiryDate(DateTime.Now, 1) });
            list.Add(new ProductDetails() { id = 3, productName = "Potato", productType = 2, productTypeDescription = ProductTypeText(2), productQuantity = "3", purchaseDate = DateTimeString(DateTime.Now), expiryDate = ExpiryDate(DateTime.Now, 2) });
            list.Add(new ProductDetails() { id = 4, productName = "Milk", productType = 3, productTypeDescription = ProductTypeText(3), productQuantity = "3", purchaseDate = DateTimeString(DateTime.Now), expiryDate = ExpiryDate(DateTime.Now, 3) });
            list.Add(new ProductDetails() { id = 5, productName = "Bread", productType = 4, productTypeDescription = ProductTypeText(4), productQuantity = "3", purchaseDate = DateTimeString(DateTime.Now), expiryDate = ExpiryDate(DateTime.Now, 4) });

            return list;
        }

        public string ExpiryDate(DateTime datetime,int productType)
        {
            DateTime date=new DateTime();
            switch (productType)
            {
                case 1:
                    date = datetime.AddDays(3);
                    break;
                case 2:
                    date = datetime.AddDays(5);
                    break;
                case 3:
                    date = datetime.AddDays(2);
                    break;
                case 4:
                    date = datetime.AddDays(4);
                    break;
                default:
                    break;
            }
          
            var dateString = date.ToString("yyyy-MM-dd");
            return dateString;
        }

        public string DateTimeString(DateTime datetime)
        {
          var date=  Convert.ToDateTime(datetime).ToString("yyyy-MM-dd");
            return date.ToString();
        }

        public string ProductTypeText(int ptId)
        {
            string text = string.Empty;
            ProductType pt = new ProductType();
            var pType = pt.GetProductType();
            for (int i = 0; i < pType.Count(); i++)
            {
               if(pType[i].ptId == ptId)
                {
                    text = pType[i].name;
                }
            }
            return text;
        }

    }
}