﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class UserGuideController : Controller
    {
        // GET: UserGuide
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("HuongDan");
        }
    }
}