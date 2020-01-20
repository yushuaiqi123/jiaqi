package com.jk.mapper;

import com.jk.model.LoginModel;
import com.jk.model.TableModel;
import com.jk.model.ViseModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelServerMapper {


    LoginModel queryUserphone(String userphone);

    Long save(LoginModel lm);

    LoginModel queryName(String username);

    List<TableModel> queryList();

    void addList(TableModel tm);

    List<ViseModel> queryVise();

    LoginModel findUserInfouserPhone(String userphone);

    LoginModel findUserInfoByPhone(String userphone);

    String updateUser(LoginModel lo);



}
