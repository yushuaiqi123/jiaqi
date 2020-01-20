package com.jk.model;

public class LoginModel {

    private Integer userid;

    private String username;

    private String userword;

    private String userphone;

    private String useremail;

    private String userimg;

    private String xname;

    private String xidentity;

    private Integer sjsex;

    private String sjdate;

    private String sjaddress;

    private String sjwork;

    private String Yzm;  //验证码

    /*userId  -用户ID
    userName -  用户名
    passWord -  密码
    userPhone - 手机号
    userImg -用户头像
    userEmail -- 邮箱
    xidentity  (身份证号)
    xname-真实姓名
    sjsex -- 社交性别
    sjjy --社交教育
    sjdate --出生日期
    sjwork -- 工作
    sjaddress --所在地区*/

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserword() {
        return userword;
    }

    public void setUserword(String userword) {
        this.userword = userword;
    }

    public String getUserphone() {
        return userphone;
    }

    public void setUserphone(String userphone) {
        this.userphone = userphone;
    }

    public String getUseremail() {
        return useremail;
    }

    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }

    public String getUserimg() {
        return userimg;
    }

    public void setUserimg(String userimg) {
        this.userimg = userimg;
    }

    public String getXname() {
        return xname;
    }

    public void setXname(String xname) {
        this.xname = xname;
    }

    public String getXidentity() {
        return xidentity;
    }

    public void setXidentity(String xidentity) {
        this.xidentity = xidentity;
    }

    public Integer getSjsex() {
        return sjsex;
    }

    public void setSjsex(Integer sjsex) {
        this.sjsex = sjsex;
    }

    public String getSjdate() {
        return sjdate;
    }

    public void setSjdate(String sjdate) {
        this.sjdate = sjdate;
    }

    public String getSjaddress() {
        return sjaddress;
    }

    public void setSjaddress(String sjaddress) {
        this.sjaddress = sjaddress;
    }

    public String getSjwork() {
        return sjwork;
    }

    public void setSjwork(String sjwork) {
        this.sjwork = sjwork;
    }

    public String getYzm() {
        return Yzm;
    }

    public void setYzm(String yzm) {
        Yzm = yzm;
    }

    @Override
    public String toString() {
        return "LoginModel{" +
                "userid=" + userid +
                ", username='" + username + '\'' +
                ", userword='" + userword + '\'' +
                ", userphone='" + userphone + '\'' +
                ", useremail='" + useremail + '\'' +
                ", userimg='" + userimg + '\'' +
                ", xname='" + xname + '\'' +
                ", xidentity='" + xidentity + '\'' +
                ", sjsex=" + sjsex +
                ", sjdate='" + sjdate + '\'' +
                ", sjaddress='" + sjaddress + '\'' +
                ", sjwork='" + sjwork + '\'' +
                ", Yzm='" + Yzm + '\'' +
                '}';
    }
}
