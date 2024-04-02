using RefWebApi.Models;
using System.Web.Http;

namespace Refrigerator2.controller
{
    public class ProductController : ApiController
    {
        public static object GetProducts()
        {
            ProductDetails pd = new ProductDetails();
            var rs = pd.GetProductList();
            return rs;
        }
    }
}
