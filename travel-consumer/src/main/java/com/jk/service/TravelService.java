package com.jk.service;

import org.springframework.cloud.openfeign.FeignClient;


@FeignClient(value = "cloud-provider")
public interface TravelService extends TravelServer{



}
