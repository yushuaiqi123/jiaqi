package com.jk.controller;

import com.jk.model.LoginModel;
import com.jk.model.TableModel;
import com.jk.model.ViseModel;
import com.jk.service.TravelServer;
import com.jk.service.TravelServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class TravelServerController implements TravelServer {

    @Autowired
    private TravelServerService travelServerService;


    @GetMapping("query")
    @ResponseBody
    public LoginModel queryUserphone(String userphone) {

        return travelServerService.queryUserphone(userphone);
    }

    @GetMapping("yanzheng")
    @ResponseBody
    public Map yanzheng(String userphone) {

        return travelServerService.yanzheng(userphone);
    }

    @ResponseBody
    public String register(LoginModel lm) {

        return travelServerService.register(lm);
    }


    @GetMapping("queryList")
    @ResponseBody
    public List<TableModel> queryList() {

        return travelServerService.queryList();
    }


    @PutMapping("addList")
    @ResponseBody
    public void addList(TableModel tm) {

        travelServerService.addList(tm);
    }

    @GetMapping("queryVise")
    @ResponseBody
    public List<ViseModel> queryVise() {

        return travelServerService.queryVise();
    }

    @GetMapping("login")
    @ResponseBody
    public String sjhLogin(String userphone, String checkCode) {

        return travelServerService.sjhLogin(userphone,checkCode);
    }


    @GetMapping("send")
    @ResponseBody
    public Map sendSms(String userphone) {

        return travelServerService.sendSms(userphone);
    }


}
