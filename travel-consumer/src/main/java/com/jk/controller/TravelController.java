package com.jk.controller;

import com.alibaba.fastjson.JSON;
import com.jk.model.LoginModel;
import com.jk.model.TableModel;
import com.jk.model.ViseModel;
import com.jk.service.TravelService;
import com.jk.util.OSSClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.rmi.runtime.Log;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("ysq")
public class TravelController {

    @Autowired
    private TravelService travelService;

    @Autowired
    private RedisTemplate redisTemplate;


    @GetMapping("login")
    @ResponseBody
    public HashMap<String,Object> login(String userphone, String userword, HttpServletRequest request){
        HashMap<String,Object> hm = new HashMap<String,Object>();
        LoginModel loginUser  = travelService.queryUserphone(userphone);
        //存id
        //request.getSession().setAttribute("user", loginUser);
        if(loginUser==null){
            hm.put("code",1);
            hm.put("msg","用户名不存在");
        }else{
            if(!loginUser.getUserword().equals(userword)){
                hm.put("code",2);
                hm.put("msg","密码不正确");
            }else{
               // redisTemplate.opsForValue().set("user_txd",loginUser.getUserId());
                request.getSession().setAttribute(request.getSession().getId(),loginUser);
                hm.put("code",3);
                hm.put("msg","登录成功");
            }
        }
        return hm;
    }


    /**
     * 注册手机号
     * @param userphone
     * @return
     */
    @GetMapping("yanzheng")
    @ResponseBody
    public Map yanzheng(String userphone){
        System.out.println("这是注册短信发送----------------------------");
        System.out.println(userphone+"----------------------------------------");
        return travelService.yanzheng(userphone);
    }


    /**
     * 判断用户+注册
     * @param lm
     * @return
     */
    @PutMapping("register")
    @ResponseBody
    public String register(LoginModel lm){

        return travelService.register(lm);
    }


    /**
     * 页面数据查询
     * @return
     */
    @GetMapping("queryList")
    @ResponseBody
    public List<TableModel> queryList(){

        return travelService.queryList();
    }

    /**
     * 新增
     * @param tm
     */
    @PutMapping("addList")
    @ResponseBody
    public void addList(TableModel tm){

        travelService.addList(tm);
    }



    @GetMapping("queryVise")
    @ResponseBody
    public List<ViseModel> queryVise(){

        return travelService.queryVise();
    }


    /**
     * 短信登录验证
     * @param userphone
     * @param checkCode
     * @return
     */
    @GetMapping("sjhLogin")
    @ResponseBody
    public String sjhLogin(String userphone,String checkCode){
        System.out.println("这是短信登陆----------------------------");
        return travelService.sjhLogin(userphone,checkCode);
    }

    /**
     * 手机号登录短信发送
     * @param userphone
     * @return
     */
    @GetMapping("sendSms")
    @ResponseBody
    public Map sendSms(String userphone){
        System.out.println("这是短信发送----------------------------");
        System.out.println(userphone+"----------------------------------------");
        return travelService.sendSms(userphone);
    }

    /**
     * OSS阿里云上传图片
     */
    @RequestMapping("updaloadImg")
    @ResponseBody
    public String uploadImg(MultipartFile userimg)throws IOException {
        if (userimg == null || userimg.getSize() <= 0) {
            throw new IOException("file不能为空");
        }
        OSSClientUtil ossClient=new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(userimg);
        String imgUrl = ossClient.getImgUrl(name);
        String[] split = imgUrl.split("\\?");
        //System.out.println(split[0]);
        String s = JSON.toJSONString(split[0]);
        return s;
    }



    /**
     * 修改个人信息
     * @param lo
     */
    @PostMapping("updateUser")
    @ResponseBody
    public String updateUser(LoginModel lo){

        travelService.updateUser(lo);
        return "1";
    }




}
