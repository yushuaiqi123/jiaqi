package com.jk.model;

import java.io.Serializable;

public class ViseModel implements Serializable {

    private static final long serialVersionUID = 6012455835971770048L;
    private Integer viseid;
    private String viseimg; //国家照片
    private String visename;  //国家
    private Integer viseprice;  //价格
    private String visetype;  //签证类型 1留学、2移民、3旅游、4商务
    private String visedate;

    public Integer getViseid() {
        return viseid;
    }

    public void setViseid(Integer viseid) {
        this.viseid = viseid;
    }

    public String getViseimg() {
        return viseimg;
    }

    public void setViseimg(String viseimg) {
        this.viseimg = viseimg;
    }

    public String getVisename() {
        return visename;
    }

    public void setVisename(String visename) {
        this.visename = visename;
    }

    public Integer getViseprice() {
        return viseprice;
    }

    public void setViseprice(Integer viseprice) {
        this.viseprice = viseprice;
    }

    public String getVisetype() {
        return visetype;
    }

    public void setVisetype(String visetype) {
        this.visetype = visetype;
    }

    public String getVisedate() {
        return visedate;
    }

    public void setVisedate(String visedate) {
        this.visedate = visedate;
    }

    @Override
    public String toString() {
        return "ViseModel{" +
                "viseid=" + viseid +
                ", viseimg='" + viseimg + '\'' +
                ", visename='" + visename + '\'' +
                ", viseprice=" + viseprice +
                ", visetype='" + visetype + '\'' +
                ", visedate='" + visedate + '\'' +
                '}';
    }


}
