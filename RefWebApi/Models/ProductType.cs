using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RefWebApi.Models
{
    public class ProductType
    {
        public int ptId { get; set; }
        public string name { get; set; }

        public List<ProductType> GetProductType()
        {
            List<ProductType> list = new List<ProductType>();

            list.Add(new ProductType() { ptId = 1, name = "Fruits"});
            list.Add(new ProductType() { ptId = 2, name = "Vegitables" });
            list.Add(new ProductType() { ptId = 3, name = "Liquid" });
            list.Add(new ProductType() { ptId = 4, name = "Others" });

            return list;
        }
    }
}