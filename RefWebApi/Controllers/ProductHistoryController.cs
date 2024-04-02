using RefWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RefWebApi.Controllers
{
    public class ProductHistoryController : ApiController
    {
        public HttpResponseMessage Get()
        {
            ProductDetails pd = new ProductDetails();
            var rs = pd.GetProductList();
            return Request.CreateResponse(HttpStatusCode.OK, rs);
        }
    }
}
