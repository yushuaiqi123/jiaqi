package com.jk.controller;

import com.jk.model.LoginModel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

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
     * 跳转注册页面
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

    /**
     * 攻略页面
     * @return
     */
    @RequestMapping("ccc")
    public String ccc(){

        return "ccc";
    }

    /**
     * 跳转玩法页面
     * @return
     */
    @RequestMapping("wan")
    public String wan(){

        return "wan";
    }

    /**
     * 跳转服务页面
     * @return
     */
    @RequestMapping("fuwu")
    public String fuwu(){

        return "fuwu";
    }

    /**
     * 跳转第二页面
     * @return
     */
    @RequestMapping("toIndex2")
    public String toIndex2(){

        return "index2";
    }


    /**
     * 跳转个人中心
     * @return
     */
    @RequestMapping("toGeren")
    public String toGeren(HttpServletRequest request, Model model){
        LoginModel loginmodel = (LoginModel) request.getSession().getAttribute(request.getSession().getId());
        model.addAttribute("m",loginmodel);
        return "gerenzhongxin";

    }






}
