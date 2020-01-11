package com.jk.model;

import java.io.Serializable;

public class TableModel implements Serializable {

    private static final long serialVersionUID = -4778019881364834228L;
    private Integer tableid;
    private String tableimg;  //图片
    private String tablename;  //名字
    private String tablejieshao;  //介绍
    private Integer tableprice;  //价格

    public Integer getTableid() {
        return tableid;
    }

    public void setTableid(Integer tableid) {
        this.tableid = tableid;
    }

    public String getTableimg() {
        return tableimg;
    }

    public void setTableimg(String tableimg) {
        this.tableimg = tableimg;
    }

    public String getTablename() {
        return tablename;
    }

    public void setTablename(String tablename) {
        this.tablename = tablename;
    }

    public String getTablejieshao() {
        return tablejieshao;
    }

    public void setTablejieshao(String tablejieshao) {
        this.tablejieshao = tablejieshao;
    }

    public Integer getTableprice() {
        return tableprice;
    }

    public void setTableprice(Integer tableprice) {
        this.tableprice = tableprice;
    }

    @Override
    public String toString() {
        return "TableModel{" +
                "tableid=" + tableid +
                ", tableimg='" + tableimg + '\'' +
                ", tablename='" + tablename + '\'' +
                ", tablejieshao='" + tablejieshao + '\'' +
                ", tableprice=" + tableprice +
                '}';
    }


}
