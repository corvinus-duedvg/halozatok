using HajosTeszt.HamModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/ham")]
    [ApiController]
    public class HamController : ControllerBase
    {
        // GET: api/ham
        [HttpGet]
        public IEnumerable<Prosciutto> Get()
        {
            MozolContext context = new MozolContext();
            return context.Prosciuttos.ToList();
        }

        // GET api/ham/5
        [HttpGet("{id}")]
        public Prosciutto Get(int id)
        {
            MozolContext context = new MozolContext();
            var selProsciutto = (from x in context.Prosciuttos
                                 where x.Id == id
                                 select x).FirstOrDefault();
            return selProsciutto;
        }

        // GET api/ham/all
        [HttpGet("all")]
        public int H1()
        {
            MozolContext context = new MozolContext();
            int hamno = context.Prosciuttos.Count();

            return hamno;
        }
        // GET api/ham/maxid
        [HttpGet("maxid")]
        public int H2()
        {
            MozolContext context = new MozolContext();
            int maxid = (from x in context.Prosciuttos
                         select x.Id).Max();
            return maxid;
        }

        // POST api/ham
        [HttpPost]
        public void Post([FromBody] Prosciutto newHampshire)
        {
            MozolContext context = new MozolContext();
            context.Prosciuttos.Add(newHampshire);
            context.SaveChanges();
        }

        // DELETE api/ham/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            MozolContext context = new MozolContext();
            var nottingHam = (from x in context.Prosciuttos
                              where x.Id == id
                              select x).FirstOrDefault();
            context.Remove(nottingHam);
            context.SaveChanges();
        }
    }
}
