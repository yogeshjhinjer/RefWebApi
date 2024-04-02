using RefWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RefWebApi.Controllers
{
    public class ProductTypeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            ProductType pt = new ProductType();
            var pType = pt.GetProductType();
            return Request.CreateResponse(HttpStatusCode.OK, pType);
        }
    }
}
