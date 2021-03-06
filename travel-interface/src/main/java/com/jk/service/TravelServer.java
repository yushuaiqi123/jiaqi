package com.jk.service;

import com.jk.model.LoginModel;
import com.jk.model.TableModel;
import com.jk.model.ViseModel;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RequestMapping("login")
public interface  TravelServer {

    @GetMapping("query")
    public LoginModel queryUserphone(@RequestParam("userphone") String userphone);

    @GetMapping("yanzheng")
    public Map yanzheng(@RequestParam("userphone")String userphone);

    @PutMapping("register")
    public String register(@RequestBody LoginModel lm);

    @GetMapping("queryList")
    public List<TableModel> queryList();

    @PutMapping("addList")
    public void addList(@RequestBody TableModel tm);

    @GetMapping("queryVise")
    public List<ViseModel> queryVise();

    @GetMapping("login")
    public String sjhLogin(@RequestParam("userphone") String userphone,@RequestParam("checkCode") String checkCode);

    @GetMapping("send")
    public Map sendSms(@RequestParam("userphone")String userphone);

    @PostMapping("updateUser")
    public String updateUser(@RequestBody LoginModel lo);



}
