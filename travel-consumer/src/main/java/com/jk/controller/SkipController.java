package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SkipController {


    /**
     * 登录
     * @return
     */
    @RequestMapping("toLogin")
    public String toLogin(){

        return "login";
    }

    /**
     * 注册
     * @return
     */
    @RequestMapping("toRegister")
    public String toRegister(){

        return "register";
    }

    @RequestMapping("table")
    public String table(){

        return "table";
    }

    /**
     * 护照展示
     * @return
     */
    @RequestMapping("hu")
    public String hu(){

        return "hu";
    }


    /**
     * 短信登录
     * @return
     */
    @RequestMapping("tokjdl")
    public String tokjdl(){

        return "kjdl";
    }

    @RequestMapping("toIndex")
    public String toIndex(){

        return "index";
    }


    @RequestMapping("add")
    public String add(){

        return "add";
    }

    @RequestMapping("bbb")
    public String bbb(){

        return "bbb";
    }

    @RequestMapping("ccc")
    public String ccc(){

        return "ccc";
    }

    @RequestMapping("wan")
    public String wan(){

        return "wan";
    }

    @RequestMapping("fuwu")
    public String fuwu(){

        return "fuwu";
    }

    @RequestMapping("toIndex2")
    public String toIndex2(){

        return "index2";
    }



}
