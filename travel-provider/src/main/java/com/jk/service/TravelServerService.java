package com.jk.service;

import com.jk.model.LoginModel;
import com.jk.model.TableModel;
import com.jk.model.ViseModel;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;


@Repository
public interface TravelServerService {

    LoginModel queryUserphone(String userphone);

    Map yanzheng(String userphone);

    String register(LoginModel lm);

    List<TableModel> queryList();

    void addList(TableModel tm);

    List<ViseModel> queryVise();


}
