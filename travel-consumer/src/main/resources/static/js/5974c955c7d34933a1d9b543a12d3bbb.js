 
 var topLevelDomain = "xiaozhu.com";
var domain = "www.xiaozhu.com";
var webimIframUrl = window.location.protocol+"//xiaozhu.com/webim.html";
var uploadImageUrl = "https://imageupload.xiaozhu.com/imgin4uploadify.php";
var jciUrl = "http://jci.xiaozhustatic1.com";
var webimYUI = "{{{webimYUI}}}";
var webimV2 = "{{{webimV2}}}";
var client_id_youku = '16edde5f79e61324';
var lodgeUnitCenterDomain = "wirelesspub-lodgeunit.xiaozhu.com";

document.domain = topLevelDomain;

var hostArray = window.location.hostname.split('.');
if (hostArray.length == 5 && hostArray[2] == 'partner') {
    topLevelDomain = hostArray[1] + '.' + hostArray[2] + '.xiaozhu.com';
} else if (hostArray.length == 4 && hostArray[1] == 'partner') {
    topLevelDomain = hostArray[0] + '.' + hostArray[1] + '.xiaozhu.com';
}

if (typeof(window.jQuery) != "undefined")
{
    if ($("#head_newmsg2"))
    {
        $("#head_newmsg2").hover(
            function () {
                $("#head_newmsg2 a.icon_arrowB").addClass("nav_current");
                $("#head_newmsg2 a.icon_arrowB").removeClass("icon_arrowB");
                $("#head_newmsg2 div.nav_pop ").show();
            },
            function () {
                $("#head_newmsg2 a.nav_current").addClass("icon_arrowB");
                $("#head_newmsg2 a.nav_current").removeClass("nav_current");
                $("#head_newmsg2 div.nav_pop ").hide();
            }
        );
    }
}

function tipBackyardSuccess(classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_right';

    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardError(errmsg,classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_error';

    $('.'+classname).html(errmsg);
    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardReset(classnameSucc, classnameErr)
{
    if (typeof(classnameSucc) == 'undefined' || classnameSucc == '')
        classnameSucc = 'tips_right';
    $('.'+classnameSucc).hide();

    if (typeof(classnameErr) == 'undefined' || classnameErr == '')
        classnameErr = 'tips_error';
    $('.'+classnameErr).hide();

}
function loadNyroModal()
{
}

//百度站长统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?92e8bc890f374994dd570aa15afc99e1";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

 
 var XZWebUrlWriter = {
    getWebPhp : function () {
        return 'xzweb.php';
    },
    getAjaxPhp : function () {
        return '/ajaxRequest/';
    },
    getRequest : function(url,type) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas,statusText,XMLHttpRequest){
                returnData = datas; 
                that.revoltReptile(XMLHttpRequest)
            },
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    getRequestSpider : function(busiKey,isReload,url,type, cb, reRequest) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_' + busiKey);
        if (spiderAvoidToken && spiderAvoidToken !== 'undefined') {
            var separator = url.indexOf('?') === -1 ? '?' : '&';
            url = url + separator + 'spiderAvoidToken=' + spiderAvoidToken;
        }
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas){
                captchaInterceptors(busiKey,isReload, datas, function () {
                    that.getRequestSpider(busiKey,isReload,url,type, cb, true);
                }, function () {
                    returnData = datas;
                    if (reRequest && cb) {
                        cb();
                    }
                });
            },
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    postRequest : function(url,requestParam) {
        if (!requestParam) var requestParam = {};
        var nexturl = $('input[name=next]').val();
        if (nexturl) requestParam.next = nexturl;
        var that =this;
        var returnData;
        $.ajax({
            type     : "POST",
            url      : url,
            data     : requestParam,
            dataType : 'json',
            async    : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){returnData = datas;},
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    revoltReptile:function(XMLHttpRequest){
        var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
        if(reaponseHeader){
            var urls = reaponseHeader.split('slideRedirect=');
            var host = urls[0] + 'slideRedirect=';
            if (urls.length > 1) {
                host = host + encodeURIComponent(urls[1]);
            }
            window.location.href = host;
        }
    },
    headTest_ReqUrl :function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckBlock';
    },
    getWebIm_ServerUrl: function() {
        return window.location.protocol+'//'+domain+'/webim.php?op=getServerUrl';
    },
    getWebIm_DrawIframeUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawIframe&userid=' + userid;
    },
    getWebIm_DrawBaseBtnUrl: function(next) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawImBaseBtn&next=' + next;
    },
    getWebIm_DrawZhunaIframeUrl : function () {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawZhunaIframe';
    },
    getWebIm_IframeUrl : function (userId) {
        return webimIframUrl;
    },
    getWebIm_LodgeUnitData: function (roomid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitData&roomid=' + roomid;
    },
    getWebIm_FavoriteList: function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteList&userid=' + userid;
    },
    getWebIm_FavoriteGroupDetail: function (groupId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteGroupDetail&groupId=' + groupId;
    },
    getWebIm_RequestNotificationUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getNotification&terminal=all_web&userid=' + userid;
    },
    getWebIm_RequestUserSysNoticeCnt : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNoticeCnt&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_RequestUserSysNotice : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNotice&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_UserData : function(userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserData&userid=' + userid;
    },
    getWebIm_talkHis : function(isTenant,offset,length) {
        return window.location.protocol+'//'+doamin+'/webim.php?op=loadTalkHis&isTenant=' + isTenant + '&offset=' + offset + '&length=' + length + '&userId=' + currentUser;
    },
    getWebIm_talkMagHis: function(tenantId,luId,length,lastMessageId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=loadTalkMsgHis&tenantId= ' + tenantId + '&luId=' + luId +'&length=' + length + '&lastMessageId= ' + lastMessageId;
    },
    getWebIm_TalkHisUrl : function (landlordid, tenantid, objid, userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getTalkHisUrl&landlordid=' + landlordid + '&tenantid=' + tenantid + '&objid=' + objid + '&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getFkScreenListUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ChatSet' + '&_t=' + new Date().getTime();
    },
    getWebIm_RequestFastReplyUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFastReply&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getWebIm_FangDongSpecialLodgeUnitUrl : function (userid) {
        return window.location.protocol+"//" + topLevelDomain + "/fangdong/" + userid +"/fangzi.html";
    },
    getWebIm_RequestRecommendLuUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getRecommendLuList&userid=' + userid;
    },
    getWebIm_RequestUserStateUrl : function (userid,imuserrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserState&userid=' + userid + '&imuserrole=' + imuserrole;
    },
    getWebIm_RequestSynTalkMsgUrl: function (userid,synMinTime,synMaxTime) {
        return window.location.protocol+'//'+domain+'/webim.php?op=SynTalkMsg&userId=' + userid + '&synMinTime=' + synMinTime + '&synMaxTime=' + synMaxTime;
    },
    getWebIm_RequestTalkMsgSetRead: function(tenantId,luId,isTenant) {
        return window.location.protocol+'//'+domain+'/webim.php?op=talkMsgSetRead&tenantId=' + tenantId + '&luId=' + luId + '&isTenant=' + isTenant + '&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustZMInfoPair : function (applyUserId,ownerUserId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetZminfo_Pair?applyUserId=' + applyUserId + '&ownerUserId='+ownerUserId+'&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustLayer : function (landlordid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAlipayTrustLayer&landlordid=' + landlordid + '&_t=' + new Date().getTime();
    },
    getWebIm_CheckKeywordUrl : function (dataArr, type) {
        return 'https://greatwall.xiaozhu.com/greatwall.php?content=' + JSON.stringify(dataArr) + '&type=' + type + '&_t=' + new Date().getTime();
    },
    getWebIm_AllFriendAndLuData : function (allfriendid,allluid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData';
        // return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData&userlist=' + allfriendid + '&lulist=' + allluid + '&_t=' + new Date().getTime();
    },
    getOperateScreen: function (toUserId,operate) {
        return window.location.protocol+'//'+domain+'/webim.php?op=doOperateImScreen&toUserId=' + toUserId+ '&operate=' + operate+ '&_t=' + new Date().getTime();
    },
    checkIsInScreenList: function (toUserId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=checkIsInScreenList&toUserId=' + toUserId+ '&_t=' + new Date().getTime();
    },
    getLodgeUnitState: function(luId){
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitState&luId=' + luId+ '&_t=' + new Date().getTime();
    },
    getWeb_NoticeReachedFeedbackUrl : function (timerid,operate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=NotificationReachedFeedback&timerid=' + timerid + '&operate=' + operate;
    },

    getWeb_InfoEventReachUrl : function (timerid,operate,receiverId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=InfoEventReach&timerid=' + timerid + '&operate=' + operate + '&receiverid='+receiverId;
    },

    getInfoEventDealActionUrl : function (dealaction,objid,objtype,receiverid,displaystrategy) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=GetInfoEventDealActionUrl&dealaction=' + dealaction + '&objid=' + objid + '&objtype=' + objtype + '&receiverid=' + receiverid + '&displaystrategy='+displaystrategy;
    },

    getWeb_FangDong_FangDong_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowLetter';
    },
    getWeb_FangKe_FangKe_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowLetter';
    },
    getWeb_FangKe_Special_Index: function(tenantid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangKe_Special_Index&tenantid=' + tenantid;
    },
    getWeb_FangDong_Special_Index: function(landlordid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangDong_Special_Index&landlordid=' + landlordid;
    },
    getWeb_FangDong_ResetFastReplyUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ChatSet';
    },
    getWeb_FangDong_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowSysNotice';
    },
    getWeb_FangKe_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowSysNotice';
    },

    getWeb_FangKe_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DoPostComment';
    },
    getWeb_FangDong_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_DoPostComment';
    },
    getWeb_FangKe_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Index';
    },
    getWeb_FangDong_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Index';
    },
    getWeb_FavoriteGroupDetailUrl : function (groupId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Favorite_MyFavoriteDetail&groupId='+groupId;
    },
    getWeb_FavoriteGroupListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_MyFavorite';
    },

    //打开点评详情页
    getWeb_FangKe_AddCommentUrl : function (bookorderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment_Self&bookorderId=' + bookorderId + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_DeleteTenantUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DeleteUserTenant&tenantId=' + tenantId;
    },
    getWeb_FangKe_UserTenantDetailUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserTenantDetail&tenantId=' + tenantId;
    },
    getWeb_FangKe_EditUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,mobile,phonecode) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&mobile=' + mobile + '&phonecode=' + phonecode + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_EditUserTenantAfterOverseaUrl : function (tenantId,realName,mobile,sex,birth,oversea,nation,mobileNation,IDCardNo,passportNo) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenantAfterOversea&tenantId=' + tenantId + '&realName=' + realName + '&mobile=' + mobile + '&sex=' + sex + '&birth=' + birth + '&oversea=' + oversea + '&nation=' + nation + '&mobileNation=' + mobileNation + '&IDCardNo=' + IDCardNo + '&passportNo=' + passportNo + '&random=' +new Date().getTime();
    },
    getWeb_FangKe_EditHaiwaiUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,email) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&email=' + email + '&random=' + new Date().getTime();
    },
    getWeb_GetCityUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelCityJson&provinceid=' + provinceId ;
    },
    getFangDong_CutUserHeadImageFrameUrl : function (headImageUrl) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutUserHeadImageFrame&headImageUrl='+headImageUrl;
    },
    /*07-03*/
    getFangDong_SetNoticeSetUrl : function (smsLodgeunitSucc,smsBookorderTimeout,smsPayTimeout,smsNewComment,emailLodgeunitSucc,emailBookorderTimeout,emailPayTimeout,emailNewComment) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_NoticeSetSub&sms_lodgeunitsucc='+smsLodgeunitSucc+'&sms_bookordertimeout='+smsBookorderTimeout+'&sms_paytimeout='+smsPayTimeout+'&sms_newcomment='+smsNewComment+'&email_lodgeunitsucc='+emailLodgeunitSucc+'&email_bookordertimeout='+emailBookorderTimeout+'&email_paytimeout='+emailPayTimeout+'&email_newcomment='+emailNewComment+'&random'+new Date().getTime();
    },
    getFangDong_OrderByStateUrl : function (orderState,pageNo,sortType) {
        sortType = ('undefined' !== typeof sortType) ? sortType : "";
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderByState&orderState='+orderState+'&sortType='+sortType+'&p='+pageNo+'&random='+new Date().getTime();
    },
    getFangDong_PayListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_PayList';
    },
    getFangDong_SetBankPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetBankPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_SetAlipayPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetAlipayPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_GetTenpayInfoUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_GetTenpayInfo&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_CleanServiceAddOrder_step2Url : function(luId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceAddOrder_step2&luId='+luId;
    },
    getFangDong_CleanServiceOrderDetailRefreshState : function(orderId,lastState) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetailRefreshState&lastState='+lastState+'&orderId='+orderId;
    },
    getFangDong_IsCanClean : function (){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderGetIsCanClean';
    },
    getFangDong_UserInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_UserInfo';
    },
    getFront_Login_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Kernel';
    },
    getFront_Register_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Register_Kernel';
    },
    getFront_DetailPageMapUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_DetailPageMap&id='+luid;
    },
    getFront_Login_SubmitUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Submit';
    },
    getFront_BookOrderPayFail : function (orderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_BookOrderPayFail&bookorderid='+orderId;
    },
    getFangDong_FlashBookUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_FlashBook';
    },

    getAjax_RegisterWithPhoneAndPass : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RegisterWithPhoneAndPass';
    },
    /* dpv2
    getAjax_SendCommentShareUrl : function (commentid, source) {
        return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SendCommentShare&commentid='+commentid+'&source='+source+'&random='+new Date().getTime();
    },
    可能废弃 或者是张晨的分享
    */
    getAjax_CommentShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_CommentFangKeShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentFangKeShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundShowUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundShow?bookOrderId='+bookOrderId;
    },
    getAjax_SaveDefaultUserHeadImageUrl : function (imgId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveDefaultUserHeadImage?id='+imgId;
    },
    getAjax_SaveUserHeadImageUrl : function (imgurl, gcx, gcy, gcw, gch) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveUserHeadImage?imgurl='+encodeURIComponent(imgurl)+'&x='+gcx+'&y='+gcy+'&w='+gcw+'&h='+gch;
    },
    /*07-03*/
    getAjax_DelCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelComment';
    },
    getAjax_BookOrderCancelReasonUrl : function (bookorderId, rejectType, rejectText) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrderCancelReason?bookorderid='+bookorderId+'&cancelType='+rejectType+'&cancelReason='+encodeURIComponent(rejectText);
    },
    getAjax_RefuseBookOrderSetLuUnBookAble : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RefuseBookOrderSetLuUnBookAble';
    },
    getAjax_FangKe_CheckInCodeVerifyUrl : function (bookorderId,code) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_CheckInCodeVerify?orderid='+bookorderId+'&code='+code;
    },
    getAjax_DelUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelUserPayment?id='+id;
    },
    getAjax_BankCityJsonUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankCityJson?provinceid='+provinceId;
    },
    getAjax_BankJsonUrl : function (bankName,bankProviceId,bankCityId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankJson?banktypeid='+bankName+'&bankprovinceid='+bankProviceId+'&bankcityid='+bankCityId;
    },
    getAjax_CheckTenpayInfoParam : function (tenpayno,tenpayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername;
    },
    getAjax_GetDefaultLandMarkUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDefaultLandMark?domain='+cityDomain;
    },
    /*08-19*/
    getAjax_CheckLodgeUnitUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckLodgeunit?luid='+cityDomain;
    },
    getAjax_CheckSearchConditionUrl : function (searchCity,cityDomain,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition?searchCity='+searchCity+"&cityDomain="+cityDomain+"&startDate="+startDate+"&endDate="+endDate;
    },
    getAjax_BuildFilterSearchUrl : function (partner,startDate,endDate,citydomain,putkey,keywordType,keywordValue,checkedHouseType,checkedfacilities,checkedrentType,guestnum,price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BuildFilterSearch?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&citydomain='+citydomain+'&putkey='+putkey+'&keywordType='+keywordType+'&keywordValue='+keywordValue+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&price='+price;
    },
    getAjax_GetDatas4Map : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4Map?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort;
    },
    getAjax_GetMapDatasLodgeUnit : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4MapLodgeUnit?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_getDatasMapLodgeunit4Page : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDatasMapLodgeunit4Page?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_doFullTextSearch4Map : function (offset,url) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch4Map?offset='+offset+'&url='+encodeURIComponent(url);
    },
    getAjax_GetBookLodgeUnitDetailUrl : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetBookLodgeUnitDetail?lodgeId="+lodgeId+"&sameRoomNum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+new Date().getTime();
    },
    getAjax_GetOrderPriceDetailUrl : function (bookOrderId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetOrderPriceDetail?bookOrderId="+bookOrderId+"&rand="+new Date().getTime();
    },
    getAjax_GetLazyInfoUrl : function (memkey,memtimeout,turl) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_LoadInfo?memkey="+memkey+"&memtimeout="+memtimeout+"&turl="+turl;
    },
    getAjax_AddFeedbackUrl : function (problem,contact,imageParam) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Add_Feedback?problem="+problem+"&contact="+contact+"&imageParam="+imageParam;
    },
    getAjax_GetFeedbackUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Get_Feedback";
    },




    getAjax_GetVerifyCode : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_GetVerifyCode?nocache="+new Date().getTime();
    },
    getAjax_CheckMobileExist : function (mobile,nationName,nationCode,source) {
        var source = source ? source : 'normal';
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckMobileExist?mobile=' + mobile + '&nationName=' +nationName+ '&nationCode=' +nationCode + '&source=' +  source;
    },
    getAjax_CheckRegistExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckRegistExist';
    },
    getAjax_CheckUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckUsernameExist?username=' + encodeURIComponent(username);
    },
    getAjax_CheckOldUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckOldUsernameExist?username=' + username;
    },
    getAjax_CheckEmailExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckEmailExist';
    },
    getAjax_CheckVerifyCode : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckVerifyCode';
    },
    getAjax_SendActivateCode : function (mobile, nationName, nationCode, verifyCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendActivateCode?mobile='+ mobile
            +'&nationName=' + nationName + '&nationCode=' + nationCode +'&verifycode='+ verifyCode + '&rand='+new Date().getTime() + '&fromType=pcRegister';
    },
    getAjax_SendAmendPassCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendAmendPassCode?mobile='+ mobile +'&verifycode='+ verifyCode +'&nationName=' + nationName +'&nationCode='+nationCode+ '&rand='+new Date().getTime();
    },
    getAjax_CheckActiveCode : function (mobile,nationName,nationCode,activateCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckActivateCode?mobile='+mobile +'&nationName='+ nationName +'&nationCode=' + nationCode +'&activatecode='+activateCode +'&rand='+new Date().getTime();
    },
    getAjax_CheckInviteCode : function (inviteCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckInviteCode?invitecode='+inviteCode;
    },
    getAjax_SendConfirmCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendConfirmCode?mobile='+ mobile +'&verifycode='+ verifyCode
            +'&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_SendQuickLoginCode : function(mobile,nationName,nationCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendQuickLoginCode?mobile='+ mobile  +  '&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_CheckConfirmCode : function (mobile,confirmCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckConfirmCode?mobile='+mobile+'&confirmcode='+confirmCode
            +'&nationName='+ nationName + '&nationCode='+ nationCode +'&rand='+new Date().getTime();
    },
    getAjax_VerifyCodeFirstShow : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_VerifyCodeFirstShow?rand='+new Date().getTime();
    },
    getAjax_Login : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_Login';
    },
    getAjax_LoginMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_LoginMobile';
    },
    getAjax_RegisterByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByMobile';
    },
    getAjax_RegisterByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByEmail';
    },
    getAjax_FindPasswordByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByEmail';
    },
    getAjax_ResetPasswordFromEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordFromEmail';
    },
    getAjax_SendRegValidateEmailUrl : function(email,next){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendRegValidateEmail?email='+encodeURIComponent(email)+'&next='+encodeURIComponent(next)+'&random='+new Date().getTime();
    },
    getAjax_FindPasswordByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByMobile';
    },
    getAjax_AmendPasswordByMobile : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByMobile';
    },
    getAjax_AmendPasswordByEmail : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByEmail';
    },
    getAjax_BindOpenAccount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BindOpenAccount';
    },
    getAjax_OpenAccountRegister : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_OpenAccountRegister';
    },
    getAjax_ReSendActiveEmail : function (uid, uidtoken) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ReSendActiveEmail?uid=' + uid + '&uidtoken=' + uidtoken;
    },
    getAjax_ChangeActiveEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeActiveEmail';
    },
    getAjax_CheckIllegalUser : function (bidType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIllegalUser?bidType=' + encodeURIComponent(bidType);
    },













    getAjax_CheckNickNameUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckNickName";
    },

    getAjax_GetPicCheckCodeShowUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_PicCheckCodeShow?nocache="+new Date().getTime();
    },
    getAjax_GetSendMessageAppDownloadUrl: function (mobile,checkcode) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Message_App_Download_Url?mobile="+mobile+"&checkcode="+checkcode+"&rand="+new Date().getTime();
    },
    getAjax_SendSms4AppDownloadUrl: function (mobile,checkcode,apptype) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SendSms4AppDownload?mobile="+mobile+"&checkcode="+checkcode+"&apptype="+apptype+"&rand="+new Date().getTime();
    },
    getAjax_CheckUserPasswordUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckUserPassword';
    },
    getAjax_CheckPhone : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPhone';
    },
    getAjax_CheckEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail?email="+email+"&random="+new Date().getTime();
    },
    getAjax_CheckEmailUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail";
    },
    getAjax_SendActiveEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Active_Email?email="+email;
    },
    getAjax_ReadSysNoticeUrl: function (messageId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_ReadSysNotice?msgId="+messageId;
    },
    getAjax_DelSysNoticeUrl : function (messageId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelSysNotice?msgId='+messageId;
    },
    getAjax_SetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_ResetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ResetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_SmsCheckCodeSendUrl : function (phonenum,nationName,nationCode,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeSend?phone='+phonenum+ '&nationName=' + nationName + '&nationCode=' +nationCode+'&checkcode='+imagecode+'&aisle='+aisle;
    },
    getAjax_SetUserPhoneCodeUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetUserPhoneCode?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_SmsCheckCodeVerifyUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeVerify?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_Front_SendPhoneCode : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendPhoneCode?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_Front_SendPhoneCodeByPhone : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendPhoneCodeByPhone?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_PhoneIsNotExist_PhoneIsLoginUserUrl : function (phonenum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+phonenum;
    },
    getAjax_UnbindSnsOpenIdUrl : function (shareType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UnbindSnsOpenId?shareType='+shareType;
    },
    getAjax_FangKeOrderList_OrderByTimeUrl : function (ordertype, createtype, p) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKeOrderList_OrderByTime?orderType='+ordertype+'&bookOrderCreateType='+createtype+'&p='+p+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundDetailUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundDetail?bookOrderId='+bookOrderId;
    },
    getAjax_FangKe_InsurancePlanUrl : function (bookOrderTenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_InsurancePlan?bookOrderTenantId='+bookOrderTenantId;
    },
    getAjax_FangKe_RejectCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_RejectCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ConfirmCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ConfirmCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ServiceCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ServiceCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_PayCashPledgeUrl : function (bookOrderId,payType,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_PayCashPledge?bookOrderId='+bookOrderId+'&payType='+payType+'&version='+version+'&rand='+new Date().getTime();
    },

    getAjax_GetMoreTalkUrl : function (talkid,rows,requestTime) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMoreTalk?talkid='+talkid+'&rows='+rows+'&_t='+requestTime;
    },
    getAjax_GetSettleAccountDetailUrl : function (orderId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSettleAccountDetail?orderId='+orderId+'&p='+pageNo;
    },
    getAJAX_getSettlementListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlementList';
    },
    getAJAX_getSettlementMonthAccountListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlmentMonthAccount';
    },
    getAjax_createSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_createSettlementAccount';
    },
    getAjax_delSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delSettlementAccount';
    },
    getAjax_FangDong_LuPromotionConditionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_LuPromotionCondition?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_CancelPromotionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_CancelPromotion?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_SelfPromotionUrl : function (luid,avgprice,selfpromotiondiscount,enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_SelfPromotion?luid='+luid+'&avgPrice='+avgprice+'&discount='+selfpromotiondiscount+'&endDay='+enddate+'&random='+new Date().getTime();
    },
    getAjax_ConvertRedPackageUrl : function (userid,convertvalue) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ConvertRedPackage?userid='+userid+'&convertvalue='+convertvalue+'&_t='+new Date().getTime();
    },
    getAjax_FangDong_TenantAuthentication2GuoZhengTongUrl : function (tenantid,realname,cardno) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_TenantAuthentication2GuoZhengTong?tenantid="+tenantid+"&realname="+realname+"&cardno="+cardno;
    },
    getAjax_ShowNewLetterUrl : function (content) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShowNewLetter?content='+encodeURIComponent(content);
    },
    getAjax_DelTalkUrl : function (talkid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelTalk?delid='+talkid;
    },
    getAjax_SetTenpayInfoUrl : function (tenpayno,tenpayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername+'&balanceform='+balanceForm;
    },
    getAjax_CheckAlipayInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_SaveAlipayInfoUrl : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername;
    },
    getAjax_SetAlipayInfoUrl : function (alipayno,alipayusername,balanceForm,id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername+'&balanceform='+balanceForm+'&id='+id;
    },
    getAjax_SetDefaultUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetDefaultUserPayment?id='+id+'&rand='+Math.random();
    },
    getAjax_SetNationalSecurityInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetNationalSecurityInfo';
    },
    getAjax_FangDong_DelMyRoomsUrl : function (roomId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_Del?lodgeunitid='+roomId;
    },
    getAjax_FangDong_MyRoomsSwithStateUrl : function (roomId,switchstr) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_SwithState?lodgeunitid='+roomId+'&switchval='+switchstr+'&random='+new Date().getTime();
    },
    getAjax_FangDong_MyPartRoomsUrl : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FangDong_MyPartRooms?parentId='+lodgeId+'&p='+pageNo;
    },
    getAjax_SetLodgeUnitCalendarUrl : function (lodgeUnitId, startDate, endDate, subPrice, bookable, roomnum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startDate+'&enddate='+endDate+'&price='+subPrice+'&bookable='+bookable+'&housenum='+roomnum+'&random='+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl : function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate;
    },
    getAjax_GetLodgeUnitCalendarUrl : function (lodgeUnitId, startdate, enddate, vstartdate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&editable=true&_vstartdate='+vstartdate+'&_t='+new Date().getTime();
    },
    getAjax_GetLodgeUnitCalendar : function (lodgeUnitId, startdate, enddate,calendarCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&calendarCode='+calendarCode+'&_t='+new Date().getTime();
    },
    getAjax_CheckCalendarVerifyCodeUrl : function(luId,verifyCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckCalendarVerifyCode?luid='+luId+'&calendarCode='+verifyCode;
    },
    getAjax_SetLodgeUnitDayPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitDayPrice?lodgeunitid='+lodgeUnitId+'&price='+price+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitWeekPriceUrl : function (lodgeUnitId, monValue,tueValue,wedValue,thuValue,friValue,satValue,sunValue,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitWeekPrice?lodgeunitid="+lodgeUnitId+"&mon="+monValue+"&tue="+tueValue+"&wed="+wedValue+"&thu="+thuValue+"&fri="+friValue+"&sat="+satValue+"&sun="+sunValue+"&startdate="+startDate+"&enddate="+endDate+"&_t="+new Date().getTime();
    },
    getAjax_FangDong_WeekMonthPromotionUrl : function (lodgeUnitId, discountPerWeek,discountPerMonth) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_WeekMonthPromotion?lodgeunitid="+lodgeUnitId+"&discountperweek="+discountPerWeek+"&discountpermonth="+discountPerMonth+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitDateIntervalPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitDateIntervalPrice?lodgeunitid="+lodgeUnitId+"&price="+price+"&_t="+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl: function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate + '&enddate='+enddate;
    },
    getAjax_FangDong_EditOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_EditOrderPrice";
    },
    getAjax_Pub_GetStepPreviewUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"_Preview?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_Pub_GetStepEditUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundSubmitUrl : function (bookOrderId, cancelBookOrderType, cancelBookOrderReason) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundSubmit?bookOrderId='+bookOrderId+'&cancelBookOrderType='+cancelBookOrderType+'&cancelBookOrderReason=' + encodeURIComponent(cancelBookOrderReason);
    },
    getAjax_Pub_GetProvinceJson : function (nation_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getProvinceInfoJson?nationid='+nation_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetCityJson : function (province_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCityJson?provinceid='+province_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetDistrictJson : function (city_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDistrictJson?cityid='+city_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLocaltion?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetsJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getStreetJson?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_CheckAlipayInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_Pub_SaveAlipayInfo : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+encodeURIComponent(alipayusername);
    },
    getAjax_Pub_SetAlipayInfo : function (alipayno,alipayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo';
        //return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SetAlipayInfo&alipayno='+alipayno+'&alipayusername='+alipayusername+'&alipaybalanceform='+balanceForm;
    },
    getAjax_Pub_PreBankPayMent_Submit : function (bankname,bankprovice,bankcity,bankaccountid,bankbranchname,pubpri,bankbranchtex,bankaccountname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreBanckPayMent_Submit?bankname='+bankname+'&bankprovice='+bankprovice+'&bankcity='+bankcity+'&bankaccountid='+bankaccountid+'&bankbranchname='+bankbranchname+'&pubpri='+pubpri+'&bankbranchtext='+bankbranchtex+'&bankaccountname='+bankaccountname;
    },
    getAjax_Pub_Set_SelfPromotion : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Set_SelfPromotion?luid='+luid;
    },
    getAjax_Pub_CutImage : function (url,width,height) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CutImage?key='+url+'&_w='+width+'&_h='+height;
    },
    getAjax_Pub_UploadCutAfterIamge : function (key,value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_uploadCutAfterImage?key='+key+'&value='+value;
    },
    getAjax_Pub_PreGetUserHeadImg : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreGetUserHeadImg';
    },
    getPub_Step1_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_HouseDetail_Submit';
    },
    getPub_Step1_RoomBase_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomBase_Submit';
    },
    getPub_Step2_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomDetail_Submit';
    },
    getPub_Step3_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomFacilities_Submit';
    },
    getPub_Step4_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPicture_Submit';
    },
    getPub_Step5_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPrice_SubmitSave';
    },
    getAjax_RoomProcessPass : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomProcessPass?roomId='+roomId;
    },
    getPub_HouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map?roomId='+roomId;
    },
    getPub_PreviewHouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map_Preview?roomId='+roomId;
    },
    getPub_PreviewHouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewHouseRoomDetail?roomId='+roomId;
    },
    getPub_Preview_HouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_HouseRoomDetail?roomId='+roomId;
    },
    getPub_PreviewDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewDetail?roomId='+roomId;
    },
    getPub_Preview_RoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomDetail?roomId='+roomId;
    },
    getPub_PreviewFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewFacilities?roomId='+roomId;
    },
    getPub_Preview_RoomFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomFacilities?roomId='+roomId;
    },
    getPub_PreviewPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPicture?roomId='+roomId;
    },
    getPub_Preview_RoomPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPicture?roomId='+roomId;
    },
    getPub_PreviewPrice : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPrice?roomId='+roomId+'&room_type=2';
    },
    getPub_Preview_Price : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPrice?roomId='+roomId;
    },
    getPub_PreviewPriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPriceQequest?roomId='+roomId+'&room_type=3';
    },
    getPub_Preview_PriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPriceQequest?roomId='+roomId;
    },
    getPub_Preview_Success : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_Success';
    },
    getPub_LodgeUnitSite : function(houseId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite?houseId='+houseId+'&rand='+Math.random();
    },
    getPub_LodgeUnitSite_Save : function(houseId,nationId,provinceId,cityId,districtId,streetId,inputAddress,latlng,doorNumber){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite_Save?houseId='+houseId+'&nationId='+nationId+'&provinceId='+provinceId+'&cityId='+cityId+'&districtId='+districtId+'&streetId='+streetId+'&inputAddress='+inputAddress+'&latlng='+latlng+'&doorNumber='+doorNumber+'&rand='+Math.random();
    },
    getPub_EditAddress : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_EditAddress';
    },
    getPub_CheckAddressUrl : function(provinceId,longitude,latitude){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_CheckAddress?provinceId='+provinceId+'&longitude='+longitude+'&latitude='+latitude+'&rand='+Math.random();
    },
    getFront_Map_GetMapData : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMapData';
    },
    getFront_Map_GetSubway4Map : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSubway4Map';
    },
    getFront_Map_CheckSearchCondition : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition';
    },
    getAjax_Map_GetLandMarkSuggestion : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLandMarkSuggestion';
    },
    getAjax_FangDong_SetAutoCheck : function (isAutoCheck) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAutoCheck?isAutoCheck=' + isAutoCheck;
    },
    getAjax_Front_GetCancelRule : function (luid,roomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetCancelRule?luid='+luid+'&roomNum='+roomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetBookAbleRoomNum : function (lodgeId,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetBookAbleRoomNum?lodgeunitid='+lodgeId+'&startdate='+startDate+'&enddate='+endDate;
    },
    getAjax_Front_GetRoomBookAble : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetRoomBookAble?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&bookorderid='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetTotalPrice4BookOrder : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTotalPrice4BookOrder?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+Math.floor(Math.random()*10000);
    },
    getAjax_Front_PicCheckCodeVerify : function (checkcode,phone) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PicCheckCodeVerify?checkcode='+checkcode+'&phone='+phone;
    },
    getAjax_Front_UpdateLoginUser : function (name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UpdateLoginUser?realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_PhoneIsLoginUser : function (mobile,name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsLoginUser?mobile='+mobile+'&realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_CollegeStudentShare : function (status,image,state,objId,objType,friendName,phone,phonecode,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/SendCollegeStudentShare?status='+status+'&image='+image+'&state='+state+'&objId='+objId+'&objType='+objType+'&friendName='+friendName+"&phone="+phone+"&phonecode="+phonecode+"&email="+email;
    },
    getAjax_Front_PhoneIsNotExist_PhoneIsLoginUser : function (value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+value+'&rand='+new Date().getTime();
    },
    getAjax_Front_GaoXiao_RoomComment : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetComment4GaoXiao?luid='+luid;
    },
    getWeb_FangDong_CommentUrl : function (filter) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Comment&filter='+filter;
    },
    getAjax_Front_UserTenantList : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_UserTenant?rand='+new Date().getTime();
    },
    getWeb_FangKe_CommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment';
    },
    getAjax_UserReal_RenZheng : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UserReal_RenZheng';
    },
    getAjax_FD_DelDiaryUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DelDiary?id='+id;
    },
    getAJAX_FD_RealNameVerifyImgSubUrl : function (data,flag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FD_RealNameVerifyImgSub?data=' + data +"&flag=" + flag;
    },
    getFangDong_CutSpecialHeadImageFrameUrl : function (imageUrl,markdw,markdh) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutSpecialHeadImageFrame&imageUrl=' + imageUrl + '&markdw=' + markdw + '&markdh=' + markdh;
    },
    getAjax_FD_SaveSpecialHeadImage : function (cutx,cuty,cutw,cuth,oriw,orih,oriurl,cutbkgw,cutbkgh,imgIntro) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_SaveSpecialHeadImage?cutx=' + cutx +"&cuty=" + cuty + "&cutw=" + cutw + "&cuth=" + cuth + "&oriw=" + oriw + "&orih=" + orih + "&oriurl=" + oriurl + "&cutbkgw=" + cutbkgw + "&cutbkgh=" + cutbkgh + "&imgIntro=" + encodeURIComponent(imgIntro);
    },
    getAjax_FD_DiaryCountUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DiaryCount';
    },
    getAjax_FD_Special_OfflineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Offline?id=' + id;
    },
    getAjax_FD_Special_OnlineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Online?id=' + id;
    },
    getAjax_FD_RealNameVerifySubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_RealNameVerifySub';
    },
    getAjax_FD_Diary_ToTopUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop?id=' + id;
    },
    getAjax_FD_Diary_ToTop_CountUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop_Count';
    },
    getFDDiaryUploadImgUrl : function () {
        return window.location.protocol+'//'+domain+'/imgin4ImageText.php';
    },
    getAjax_GetTenantTagsUrl: function (tenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantTags?tenantid=' + tenantId;
    },
    getAjax_UpdateSelfIntroUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateSelfIntro';
    },
    getAjax_UpdateCheckInInfoDisplayTypeUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateCheckInInfoDisplayType';
    },
    getAjax_GetTenantSpecialHeadImgsUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantSpecialHeadImgUrl';
    },
    getAjax_SetTenantSpecialHeadImgUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantSpecialHeadImgUrl';
    },
    getAjax_SearchLodgeUnit : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchLodgeUnit';
    },
    getWeb_NeedPub: function (cityDomain, startDate, endDate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub&startDate='+startDate+'&endDate='+endDate+'&searchcity='+cityDomain;
    },
    getWeb_NeedPubSubmit : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub_Submit';
    },
    getAjax_SetTenantNeedResponseStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedResponseStatus';
    },
    getAjax_SetTenantNeedTimeOutStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedTimeOutStatus';
    },
    getAjax_NeedLodgeunit : function () {
        return window.location.protocol+'//'+domain+'//ajaxRequest/Ajax_getNeedLodgeunit';
    },
    getAjax_NeedLandlord : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNeedLandlord';
    },
    getAjax_ValidNeedCount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ValidNeedCount';
    },
    getFront_Login : function (next) {
        return window.location.protocol+'//'+topLevelDomain+'/login?next='+next;
    },
    getAjax_MakeAgeInfo : function (year,month,day) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_MakeAgeInfo?year='+year+'&month='+month+'&day='+day;
    },
    getAjax_CookieNoSubmitUsernameAndEmail : function (username,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CookieNoSubmitUsernameAndEmail?username='+username+'&email='+email;
    },
    getAjax_IncreaseGuideVisits : function (guideType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_IncreaseGuideVisits?type='+guideType+'&random='+ new Date().getTime();
    },
    getAjax_FK_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_OperatorTenantNeedOrder';
    },
    getAjax_FD_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_OperatorTenantNeedOrder';
    },
    getAjax_GetTenantNeedOrderPriceDetailUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantNeedOrderPriceDetail?tenantNeedOrderId=' + id + "&rand="+new Date().getTime();
    },
    getAJAX_TenantNeedOrderPaySynLockCheckUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_TenantNeedOrderPaySynLockCheck';
    },
    getAjax_FD_EditTenantNeedOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FD_EditTenantNeedOrderPrice";
    },
    getAjax_InviteFriendByEmailUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_InviteFriendByEmail';
    },
    getAjax_UpdateInviteCodeUrl : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_UpdateInviteCode';
    },
    getAjax_InviteListUrl : function (offset) {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteList?offset=' + offset + '&length=10';
    },
    getAjax_InviteInfo : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteInfo';
    },
    getAjax_GetReferrerLandlordsUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetReferrerLandlords';
    },
    getAjax_doSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSettle';
    },
    getAjax_SetBankPaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetBankPaymentSub';
    },
    getAjax_setAlipaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_setAlipaymentSub';
    },
    getAjax_TenantDoSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_TenantDoSettle';
    },
    getAjax_LandlordDirectsellSettleRecordDataUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLandlordDirectsellSettleRecordData';
    },
    getAjax_ShareAfter : function (objId,objType,shareContentType,channel) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShareAfter?objid='+objId+'&objtype='+objType+'&sharecontenttype='+shareContentType+'&channel='+channel;
    },
    getAjax_Exam : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_do_FangDong_Examination';
    },
    getAjax_Add_Cui : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_Special_Add_Urge';
    },
    getAjax_FangkeInBlackList : function (mobile,cardNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangkeInBlackList?mobile='+mobile+'&cardNo='+cardNo;
    },
    getAjax_BookOrder_EditUserInfo : function (password,nickname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrder_EditUserInfo?password='+password+'&nickname='+nickname;
    },
    getAjax_jsErrorLogger : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_JsErrorLogger';
    },
    getAjax_BookOrder_CheckState : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_BookOrder_CheckState?luid="+lodgeId+"&roomnum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+'&bookOrderId='+bookOrderId+'&version='+version+"&rand="+new Date().getTime();
    },
    getAjax_1yuanAutumnStatus : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/autumnDeep1yuanInStatus?time="+new Date().getTime();
    },
    getAjax_Add_Zan : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Add_Zan';
    },
    getAjax_sendCoupon4AprilFoolDay : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_sendCoupon4AprilFoolDay';
    },
    getAjax_BookPayIntegralCoupon : function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayIntegralCoupon?bookorderid='+bookorderid;
    },
    getAjax_CouponInfo: function (couponid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetCouponInfo?couponid='+couponid;
    },
    getAjax_BookPayAbleCoupon: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayAbleCoupon?bookorderid='+bookorderid;
    },
    //dpv2 feiqi
    getWeb_FangKe_CheckCommentUrl: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommitCheck?bookorderid='+bookorderid;
    },
    getAddBillSubUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBillSub';
    },
    getUserBillHistoryUrl : function(pageNum){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillHis?p='+pageNum+'&rand='+Math.random();
    },
    getCancelBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillCancel?id='+id;
    },
    getAddBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBill?invoiceId='+id+'&rand='+Math.random();
    },
    getBillUrl : function(state,id){
        var url = '';
        if(state){
            url = '&state='+state;
        }
        if(id){
            url = '&invoiceId='+id;
        }
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FK_AddBill'+url;
    },
    getAjax_drawLottery4NoonBreakUrl : function (district,address){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DrawLottery4NoonBreak?district='+district+'&address='+address+'&rand='+Math.random();
    },
    getAjax_getNoonBreakAwardUrl : function (name,mobile,sleepTime){
        if(name && mobile && sleepTime){
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?name='+encodeURI(name)+'&mobile='+mobile+'&sleepTime='+sleepTime+'&rand='+Math.random();
        } else {
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?rand='+Math.random();
        }
    },
    getAjax_getAvaliableCarBedUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAvaliableCarBed?rand='+Math.random();
    },
    getAjax_LuckerList4NoonBreakUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_LuckerList4NoonBreak?rand='+Math.random();
    },
    getAjaxAddFavorite: function (loginUserid,lodgeUnitId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavorite?loginUserid='+loginUserid+'&lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxEditFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_EditFavoriteGroup';
    },
    getAjaxAddFavoritePage: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAddFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteNew: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavoriteNew';
    },
    getAjaxCancelFavorite: function (lodgeUnitId,groupId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelFavorite?lodgeUnitId='+lodgeUnitId+'&groupId='+groupId+'&rand='+new Date().getTime();
    },
    getAjaxCancelAllFavorite: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelAllFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_addFavoriteGroup';
    },
    getAjaxDelFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delFavoriteGroup';
    },
    getAjaxGetZhiMaNoCashPledgeList: function (cityId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getZhiMaNoCashPledgeList?cityId='+cityId+'&rand='+new Date().getTime();
    },
    getAjaxApplyCashPledgeByLandlordUrl : function(bookOrderId,pledge2Landlord,reason){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyCashPledge';
    },
    getAjaxCancelCashPledgeByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_CancelCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjaxApplyServiceByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyService4CashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getReturnCashPledgeUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ReturnCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAJAX_GetLodgeUnitCalendar : function (luid,startDate,endDate,editable,calendarCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLodgeUnitCalendar?lodgeunitid='+luid+'&startdate='+startDate+'&enddate='+endDate+'&editable='+editable+'&calendarCode='+calendarCode+'&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamen : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_luckyDraw&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamenShare : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_shareLuckyDraw&rand='+Math.random();
    },
    getAJAX_applyCleanService : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_applyCleanService';
    },
    getAJAX_getMsCoupon : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getMsCoupon';
    },
    getAJAXA_getServiceTimeByDate : function(date){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_getServiceTimeByDate&date='+date+'&rand='+new Date().getTime();
    },
    getAjax_submitCleanServiceOrder : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_submitCleanServiceOrder';
    },
    getCleanServiceOrderDetailUrl : function(orderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetail&orderId='+orderId;
    },
    getAjax_cleanServiceOrderPaySubmit : function(orderId,bank) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderPaySubmit&orderId='+orderId+'&bank='+bank;
    },
    getAjax_cancelCleanServiceOrder : function(orderId,cancelType,returnMoney,punishMoney){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderCancelSubmit&orderId='+orderId+'&returnMoney='+returnMoney+'&punishMoney='+punishMoney+'&cancelType='+cancelType+'&rand='+new Date().getTime();
    },
    getFangDong_MyRoomsUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_MyRooms';
    },
    getAjax_sendCouponUrl: function (mobile,verifycode,state) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_sendCoupon?mobile="+mobile + "&verifycode=" + verifycode + "&state=" +state;
    },
    getBookOrderSubmitUrl: function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_AddBookorderSubmit';
    },
    getAjax_nationCodeHtml: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetNationCodeHtml";
    },
    getAjax_nationCardHtml: function () {
        return window.location.protocol+"//"+domain+"/xzweb.php?op=GetNationCardHtml";
    },
    getAjax_CheckTenantMobile: function (tenantId,mobile,mobileNation) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckTenantMobile?tenantId="+tenantId+"&tenantMobile="+mobile+"&mobileNation="+mobileNation;
    },
    getAjax_checkEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateRegEmail";
    },
    getAjax_checkFindPwdEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateFindPwdEmail";
    },
    getAjax_checkActiveEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateActiveEmail";
    },
    get_SetUserInfoSubUrl : function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=SetUserInfoSubByType';
    },
    getWeb_GetProvinceUrl : function (nationId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelProvinceJson&nationid=' + nationId ;
    },
    getAjax_GetShareInfo : function (objId,objType,shareContentType,cityId,shareInvite,hideWechat) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetShareInfo?objId='+objId+'&objType='+objType+'&shareContentType='+shareContentType+'&cityId='+cityId+'&shareInvite='+shareInvite+'&hideWechat='+hideWechat;
    },
    getAjax_GetCityLightsV3Url : function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DoCityLightsV3';
    },
    getAjax_GetFirstOrderReducePermission : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetFirstOrderReducePermission';
    },
    getAjax_ChannelStatistics : function (objid, opertype, channels, statisticsSign) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_StatisticsSubmit?objid='+objid+'&opertype='+opertype+'&channels='+channels+'&statisticsSign='+statisticsSign;
    },
    getAjax_UnSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UnSignFirstCheckIn';
    },
    getAjax_doSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSignFirstCheckIn';
    },
    getAjax_GetQualificationConfigList: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationConfigList?luId='+luId;
    },
    getAjax_GetQualificationInfo: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationInfo?luId='+luId;
    },
    getAjax_Qualification_Submit: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_Submit';
    },
    getAjax_QualificationMaterial: function(materialConfigId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_QualificationAvailableMaterial?materialConfigId='+materialConfigId;
    },
    getQualicationInfo : function(luId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_QualificationInfo&lodgeUnitId='+luId;
    },
    getFangKeUserInfo : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserInfo';
    },
    getFdOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderDetail&bookOrderId='+bookOrderId;
    },
    getFkOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_OrderDetail&bookOrderId='+bookOrderId;
    },
    getAjax_doFullTextSearchUrl: function(offset, url){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch?offset='+offset+'&url='+url;
    },
    getAjax_CheckIDCardIfAuth : function(idcard){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIDCardIfAuth?idcard='+idcard;
    },
    getAjax_SendSensitiveOPCode: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendSensitiveOPCode';
    },
    getAjax_SensitiveOPCodeVerify: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SensitiveOPCodeVerify';
    },
    getAjax_PartnerSetNewsletter : function (partnerChannel,canSend) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PartnerSetNewsletter?partnerChannel='+encodeURIComponent(partnerChannel)+'&canSend='+encodeURIComponent(canSend);
    },
    getAjax_updateOrderCashPledge : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateOrderCashPledge?bookOrderId='+bookOrderId;
    },
    getAjax_CheckPartnerOrderPrice : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPartnerOrderPrice';
    },
    getAjax_GetSameRooms : function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSameRooms?luid='+luId;
    },
    getAjax_GetCommentDiary4Index : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCommentDiary4Index';
    },
    getAjax_GetDetailComment : function (lodgeId,cityDomain,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDetailComment?lodgeId='+lodgeId+"&cityDomain="+cityDomain+"&p="+pageNo;
    },
    getAjax_GetOtherDetailComment : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetOtherDetailComment?lodgeId='+lodgeId+'&p='+pageNo;
    },
    getAjax_FlashBook_LandlordSetting : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_LandlordSetting';
    },
    getAjax_FlashBook_UpdateLandlordSetting:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_UpdateLandlordSetting';
    },
    getAjax_GetLawPopupPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLawPopupPage';
    },
    getAjax_GetAgreementPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetAgreementPage';
    },
    getAjax_DoAgree_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoAgree';
    },
    getAJAX_GetTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetTerminalUniqueIdentification';
    },
    getAJAX_SetTmpTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SetTmpTerminalUniqueIdentification';
    },
    getAJAX_SetBaiTuanGetRoomInfo_Url:function(type, module, page, pagesize, random) {
    	random = typeof random !== 'undefined' ?  random : 1;
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMainActivity?type='+type+'&module='+module+"&page="+page+"&pagesize="+pagesize+"&random="+random;
    },
    getAJAX_ChangeLodgeUnitRepositoryBookFlow:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeLodgeUnitRepositoryBookFlow';
    },
    getAJAX_SetBaiTuanSendCoupond_Url:function(type,tag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanCoupondSend?type='+type+"&tag="+tag;
    },
    getAJAX_SetMeisuView_Url:function(luid, module) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMeisuView?luid='+luid+"&module="+module;
    },
    getAjax_CancelAuthForYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CancelAuthForYunzhanggui';
    },
    getAjax_IsAuthToYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_IsAuthToYunzhanggui';
    },
    // 百团领券
    getAjax_baituanCoupon: function(couponActivityId,userid){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoSendCouponByUser?couponActivityId='+couponActivityId+'&loginUser='+userid;
    },
    getAJAX_HomeStayActivity_Url:function(params) {
    	    var str = '';
    	    for(key in params){
            str += key+"="+params[key]+"&";
        }
        var url = window.location.protocol+'//'+domain+'/ajaxRequest?'+str;
        return url;
    },
    //百团活动页
    getWeb_baituanActivityUrl:function(){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_HomeStayMain';
    },
    //图片uploadUrl
    getUpload_Url : function(params)
    {
        if(params === undefined){
            params = '';
        }
        var url = uploadImageUrl + params;
        if(uploadImageUrl.indexOf("http") != -1)
        {
            if(window.location.protocol == "https"){
                url = "https" + uploadImageUrl.substring(5) + params;
            }
        }else{
            url = window.location.protocol + '//' + uploadImageUrl + params;
        }
        return url;
    },
    
    config:{
        env: function(){
            var hostName = window.location.host;
            var envParams =['Dev','Test','Prerelease','Pro'];
            var switchPro = true,envListIndex ;
            for(var i = 0;i<envParams.length;i++){
               var reg = new RegExp(envParams[i].toLowerCase());
               if(reg.test(hostName)){
                   switchPro = false;
                   envListIndex = i;
               }
            }
            if(switchPro){
                return 'Pro';
            }else{
                return envParams[envListIndex];
            }
        },
        xzfk: '/app/xzfk/web/500/',
        // 开发环境
        mainDomainDev: 'https://wirelesspub-global.dev.xiaozhu.com',
        // 测试环境
        mainDomainTest: 'https://test-wirelesspub-global-env00.xiaozhu.com',
        // 预上线环境
        mainDomainPrerelease: 'https://prerelease-wirelesspub-global.xiaozhu.com',
        // 正式环境
        mainDomainPro: 'https://wirelesspub-global.xiaozhu.com'
    },
    // 获取安全验证方式
    getSlideVerifyType:function(){
        return this.config['mainDomain' + this.config.env()] + this.config.xzfk + 'verify/getSlideVerifyType';
    },
    getSlideVerifyRes:function () {
        return this.config['mainDomain' + this.config.env()] + this.config.xzfk + 'verify/getSlideVerifyRes';
    },
    getProductTypeList:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetProductTypeList';
    },
    getSearchCitysLists:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCitys';
    },
    getCancelRule: function(luid){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysCancelRule&luId='+ luid;
    },
    updateCancelRule: function(luid, type, limitCancelOrder){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysUpdateLodgeUnit&luId='+ luid + '&type=' + type + '&limitCancelOrder=' + limitCancelOrder;
    },
    getIndexCancelRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRule&luId='+ luid;
    },
    getSelectRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_CancelRuleLodgeUnitCenter&luId='+ luid;
    },
    getCancelRuleDate: function (luid, checkInDay, checkOutDay) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRuleWithDate&luId='+ luid + '&checkInDay=' + checkInDay + '&checkOutDay=' + checkOutDay;
    },
    getCityInfo:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCityInfo';
    },
    getLandlordRealNameState: function (userId, luId) {
        if(!luId){
            return window.location.protocol + '//' + lodgeUnitCenterDomain + '/app/xzfd/web/500/lodgeUnit/getLandlordRealNameState?userId=' + userId;
        }
        return window.location.protocol + '//' + lodgeUnitCenterDomain + '/app/xzfd/web/500/lodgeUnit/getLandlordRealNameState?userId=' + userId + '&luId='+ luId;
    }
};
 
 var xzRegularExpression={a:1,isNum:/^\d{1,}$/,isMobile:/^\d{11}$/,isMobileWithSplit:/^[\d-]{10,}$/,isUsername:/^[\w|\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]*$/,isChinese:/^[\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]+$/,simpleMobile:/^\d{11}$/,mobile:/^1((2[7])|(3[0-9])|(4[5-9])|(5[0-9])|(6[124567])|(7[0-8])|(8[0-9])|(9[0-9]))\d{8}$/,password:/^[0-9a-zA-Z*!@.\-? : ;|$#%^&()_+=\[\]\\\/{}<>",~`']{0,}$/,numbers:/[1-9][0-9]{4}/,simpleEmail:/^.*?@.+$/,email:/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+[a-zA-Z]+$/,passport:/^[\d\w]{4,20}$/,inviteCode:/^[A-Z0-9]{7,15}$/,simpleDate:/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,simpleDateTime:/^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9](:[0-5][0-9]){1,2}$/}; 
 window.captchaModel = {
    toast: function (msg, type) {
        if (!msg) return false;
        if (!$('body').find('.xz_toast_private').length) {
            var div = '<div class="xz_toast_private"><span class="toast_txt">' + msg + '</span></div>';
            $('body').append(div);
            $('.xz_toast_private').css({
                "position": "fixed",
                "z-index": '10002',
                "min-width": "380px",
                "padding": "15px 15px 15px 20px",
                "line-height": "24px",
                "text-align": "center",
                "background": "#D4EDEB",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "left": "50%",
                "transform": "translateX(-50%)",
                "top": "20px",
                "box-sizing": "border-box",
                "border": "1px solid #26A69A",
                "border-color": "#D4EDEB"
            });
            $('.xz_toast_private .toast_txt').css({
                "background-image": "url('/images/detail/icon-success.png')",
                "background-position": 'left center',
                "background-repeat": 'no-repeat',
                "padding": "10px 0 10px 30px"
            });
        } else {
            $('.xz_toast_private .toast_txt').html(msg);
        }
        $('.xz_toast_private').css({
            "background": type === "error" ? "#FFEBF2" : "#D4EDEB",
            "color": type === "error" ? "#ff4081" : "#26A69A",
            "border-color": type === "error" ? "#FFEBF2" : "#D4EDEB"
        });
        $('.xz_toast_private .toast_txt').css({
            "background-image": type === "error" ? "url('/images/detail/icon-error.png')" : "url('/images/detail/icon-success.png')"
        });
        $('.xz_toast_private').show();
        var timer = setTimeout(function () {
            $('.xz_toast_private').hide();
            $('.xz_toast_private .toast_txt').html('');
            window.clearInterval(timer);
            timer = null;
        }, 3 * 1000);
    },
    showModel: function (node) {
        if (!$('body').find('.xz_model_private').length) {
            var div = '<div class="xz_model_private"><div class="panel"><div class="slide"><div class="tips">请您完成以下验证，验证成功后可继续探索小猪。</div><div class="node">' + node + '</div></div></div></div>';

            $('body').append(div);
            $('.xz_model_private').css({
                "position": "fixed",
                "z-index": '10001',
                "background": "rgba(0, 0, 0, .6)",
                "top": "0",
                "left": "0",
                "right": "0",
                "bottom": "0",
                "display": "none"
            });
            $('.xz_model_private  .panel').css({
                "position": "fixed",
                "top": "50%",
                "left": "50%",
                "z-index": '1002',
                "width": "300px",
                "min-height": "150px",
                "padding": "25px 25px 25px 25px",
                "text-align": "center",
                "background": "#fff",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "display": "flex",
                "display": "-webkit-flex",
                "justify-content": "center",
                "-webkit-justify-content": "center",
                "align-items": "center",
                "-webkit-align-items": "center",
                "transform": "translate(-50%, -50%)",
            });
            $('.xz_model_private .tips').css({
                "margin-bottom": "20px",
                "width": "100%",
                "color": "#212121",
                "font-size": "16px",
                "text-align": "left"
            });
        } else {
            $('.xz_model_private .node').empty().append(node);
        }
        $('.xz_model_private').css('display', 'block');
    },
    hideModel: function () {
        $('.xz_model_private').css('display', 'none');
    }
};
 
 /*
*
*
* init: 操作滑动模块dom函数
* onSuccess: 验证成功的回调函数
* onLoad: 初始化成功函数
* onError: 初始化错误函数
*
*
*
* 返回实例参数：
*
*
* 验证类型 默认网易
* slideVerifyType
*
* 网易验证通过token
* NECaptchaValidate
*
*
* 阿里验证通过token
* slideVerifyToken
* slideVerifyScene
* slideVerifySessionId
* slideVerifySig
*
* 验证通过标志
* safeChecked
*
*
*
* */
var cookieApi = {
    setCookie: function (name, value, day) {
        var domain = ';path=/;domain=xiaozhu.com';
        if (day !== 0) {
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + domain;
        } else {
            document.cookie = name + "=" + escape(value) + domain;
        }
    },
    getCookie: function (name){
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg) ){
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    }
};

var safeChecked
var calendarToken = cookieApi.getCookie('SPIDER_AVOID_TOKEN_calendar');
if (calendarToken) {
    localStorage.setItem('SPIDER_AVOID_TOKEN_calendar', calendarToken);
}
function Captcha(config) {
    var that = this;

    // 获取滑动验证类型接口
    var URL_GET_SLIDE_VERIFY_TYPE = XZWebUrlWriter.getSlideVerifyType();
    // 滑动验证码验证接口
    var URL_GET_SLIDE_VERIFY_RES = XZWebUrlWriter.getSlideVerifyRes();

    var fetch = function (type, url, cb) {
        // 获取滑动验证类型
        if (type === 'res') {
            url = url +
                '?NECaptchaValidate=' + that.NECaptchaValidate +
                '&slideVerifyType=' + that.slideVerifyType +
                '&slideVerifyToken=' + that.slideVerifyToken +
                '&slideVerifySessionId=' + that.slideVerifySessionId +
                '&slideVerifySig=' + that.slideVerifySig +
                '&slideVerifyScene=' + that.slideVerifyScene +
                '&busiKey=' + config.busiKey;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        };
        xhr.send();
    };

    // 验证类型 默认网易云
    that.slideVerifyType = 'yidun';

    // 网易验证通过token
    that.NECaptchaValidate = '';

    // 阿里验证通过token
    that.slideVerifyToken = '';
    that.slideVerifyScene = '';
    that.slideVerifySessionId = '';
    that.slideVerifySig = '';

    // 验证通过
    that.safeChecked = false;
    if (config.busiKey) {
        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'no');
    }

    var uniqueId = Math.random().toString(36).substr(2);
    var initSafeCheck = function () {
        $('#captcha').remove();
        var head= document.getElementsByTagName('head')[0];
        var first= head.firstChild;
        var spidersafeScript = document.createElement("script");
        spidersafeScript.setAttribute('id', 'captcha');
        spidersafeScript.type = "text/javascript";
        spidersafeScript.src = that.slideVerifyType === 'yidun' ? "https://cstaticdun.126.net/load.min.js" : "https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012";
        head.insertBefore(spidersafeScript, first);
        spidersafeScript.onload = function () {
            var slideContainer = '<div style="margin-bottom: 10px;width: 100%;" id="'+ that.slideVerifyType + uniqueId + '" class="nc-container"></div>';
            config.init(slideContainer);
            if (that.slideVerifyType === 'yidun') {
                /*
                *
                * 网易验证
                *
                * */
                initNECaptcha({
                    // 网易key
                    captchaId: '8c35527a6e7f4dcbba3768634a3bc61f',
                    // 网易验证码容器
                    element: '#' + that.slideVerifyType + uniqueId,
                    mode: config.mode || 'embed',
                    width: 340,
                    // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    onReady: function (instance) {

                    },
                    // 验证成功
                    onVerify: function (err, data) {
                        try {
                            that.NECaptchaValidate = data.validate || '';
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.spiderAvoidToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                    }
                                    $('.input-slidecode-tip').hide();
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }

                    }
                }, function onload(instance) {
                    // 初始化成功
                    if (config.onLoad) {
                        config.onLoad();
                    }
                }, function onerror(err) {
                    // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                    if (config.onError) {
                        config.onError();
                    }
                })
            } else if (that.slideVerifyType === 'aliyun') {
                /*
                *
                * 阿里验证
                *
                * */
                var nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':');
                var NC_Opt = {
                    renderTo: '#' + that.slideVerifyType + uniqueId,
                    appkey: 'FFFF0N0000000000703C',
                    scene: 'nc_register',
                    token: nc_token,
                    customWidth: config.width || 300,
                    trans: {
                        'key1': 'code0'
                    },
                    elementID: ['usernameID'],
                    is_Opt: 0,
                    language: 'cn',
                    isEnabled: true,
                    timeout: 3000,
                    times: 5,
                    apimap: {
                        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                        // 'get_captcha': '//b.com/get_captcha/ver3',
                        // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                        // 'get_img': '//c.com/get_img',
                        // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                        // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
                        // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
                        // 'umid_serUrl': 'https://g.com/service/um.json'
                    },
                    callback: function (data) {
                        try {
                            that.slideVerifyToken = nc_token;
                            that.slideVerifySessionId = data.csessionid;
                            that.slideVerifySig = data.sig;
                            that.slideVerifyScene = NC_Opt.scene;
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.spiderAvoidToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                    }
                                    $('.input-slidecode-tip').hide();
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }
                    },
                    error: function () {
                        if (config.onError) {
                            config.onError();
                        }
                    }
                };
                var nc = new noCaptcha(NC_Opt);
                nc.upLang('cn', {
                    _startTEXT: '请按住滑块，拖动到最右边',
                    _yesTEXT: '验证通过',
                    _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
                    _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
                })
            }
        }
    };

    var getSlideVerifyTypeCb = function (res) {
        var data = typeof res === 'string' ? JSON.parse(res) : res;
        if (data.status === 200) {
            that.slideVerifyType = data.content || 'yidun';
            initSafeCheck();
        }
    };

    fetch('type', URL_GET_SLIDE_VERIFY_TYPE, getSlideVerifyTypeCb);
}
 
 function captchaInterceptors (busiKey, isReload, res, captchaAction, successAction,status) {
    if (typeof res === 'string' && (res.indexOf('status') !== -1)) {
        res = JSON.parse(res);
    }
    if(status && status ==307){
       if (isReload) {
          var curLocation = window.location.href;
          var host = (window.location.host.indexOf('www') === 0) ? 'www.xiaozhu.com' : window.location.host;
          window.location.href =  window.location.protocol + '//' +
             'bizverify.xiaozhu.com?slideRedirect=' +
             encodeURIComponent(curLocation);
       } else {
          var onSuccess = function () {
             window.captchaModel.hideModel();
             captchaAction();
          };
          if (busiKey === 'calendar') {
             $('#calendar-box').hide();
          }
          var captcha = new Captcha({
             init: window.captchaModel.showModel,
             onSuccess: onSuccess,
             busiKey: busiKey
          });
       }
       return;
    }
    if (typeof res === 'object' && res !== null && 'status' in res) {
        if (res.status === 6000 || res.status === 60001) {
            if (isReload) {
               var curLocation = window.location.href;
               var host = (window.location.host.indexOf('www') === 0) ? 'www.xiaozhu.com' : window.location.host;
               window.location.href =  window.location.protocol + '//' +
                   'bizverify.xiaozhu.com?slideRedirect=' +
                   encodeURIComponent(curLocation);
            } else {
                var onSuccess = function () {
                    window.captchaModel.hideModel();
                    captchaAction();
                };
                if (busiKey === 'calendar') {
                   $('#calendar-box').hide();
                }
                var captcha = new Captcha({
                    init: window.captchaModel.showModel,
                    onSuccess: onSuccess,
                    busiKey: busiKey
                });
            }
        } else {
            successAction();
        }
    } else {
        successAction();
    }

}
 
 (function($) {
    $.fn.lazyload = function(options) {
        var settings = {
            threshold: 0,
            lazyImgWidth: 32,
            lazyImgHeight: 32,
            userAttr: "lazy_src"
        };
        if (options) {
            $.extend(settings, options);
        }

        var scrolltop = (document.body.scrollTop || document.documentElement.scrollTop+ 5);
        var visiableArea = $(window).height();
        elements = $("img[lazy_src]["+settings.userAttr+" != 'finish']");
        for(var i=0; i<elements.length; i++) {
            var imgtop = 0;
            var img = elements[i];

            imgtop = $.getElementTop(img);
            if(imgtop < scrolltop+visiableArea) {
                var truesrc = $(img).attr(settings.userAttr);
                $(img).attr("src", truesrc);
                $(img).attr(settings.userAttr, "finish");
            }
        }
        var obj = (options && options.operationobj != undefined) ?  options.operationobj : $(window)  ;
        obj.scroll(function(){
            var scrolltop = (options && options.operationobj != undefined) ? options.operationobj.scrollTop() : (document.body.scrollTop || document.documentElement.scrollTop+ 5) ;
            var visiableArea = $(window).height();
            elements = $("img[lazy_src]["+settings.userAttr+" != 'finish']");
            for(var i=0; i<elements.length; i++) {
                var imgtop = 0;
                var img = elements[i];

                imgtop = $.getElementTop(img);
                if(imgtop < scrolltop+visiableArea) {
                    var truesrc = $(img).attr(settings.userAttr);
                    $(img).attr("src", truesrc);
                    $(img).attr(settings.userAttr, "finish");
                }
            }
        });

    };
    $.getElementTop = function(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    };
})(jQuery);
 
 var _keywordValue = '';
var districtSearchKey = 'E';

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
$(function(){
    var guidForSearchResultCookieName = 'xz_guid_4se';
    if(getCookie(guidForSearchResultCookieName) == ''){
        setCookie(guidForSearchResultCookieName, guid(), 24*60*60*1000*720, '/', '.xiaozhu.com');
    }
});

function getFullDate(date){
    var _FullDate = date;
    if(date < 10)
        _FullDate = 0 + String(date);

    return _FullDate;
}
function searchCity(pageType)
{
   if($('#actionname').val()=='Front_Search'){
     var searchCity = $('#searchcityd').attr("value");
   }else{
     var searchCity = $('#searchcity').attr("value");
   }

    var cityDomain = $('#citydomain').attr("value");
    var suggestion_cityDomain = $('#suggestion_citydomain').attr("value");
    if(suggestion_cityDomain != "")
        cityDomain = suggestion_cityDomain;
    var searchKey = $('#searchkey').val();//api name
    var searchPutKey = $('#keyword').val();//user set word
    var searchLid = $('#landmarkid').val();
    var landmarktype = $('#landmarktype').val();
    var defaulturl = $('#defaulturl').val();
    var isOpenBlank = $('#isopenblank').val();
    var abroad      = $('#abroad').val();
    var timeZone    = $('#timeZone').val();
    var jumpUrl = '';
    if(searchKey == _keywordValue)
        searchKey = '';
    if(searchPutKey == _keywordValue || searchPutKey=='输入地点...')
        searchPutKey = '';

    if(!searchCity || searchCity =='城市或目的地' || searchCity == '城市')
    {
        if(abroad == 1){
            $('#tip_searchcity').html("请选择城市");
        }else{
            $('#tip_searchcity').html("请选择城市或目的地");
        }
        $('#tip_searchcity').show();
        return ;
    }
    var searchCityBak = searchCity;
    searchCity = encodeURI(searchCity);
    var startDate = $('#startdate').attr('value');
    var endDate = $('#enddate').attr('value');

    var abtest_ABTest4SearchDate = getCookie('abtest_ABTest4SearchDate');
    if (abtest_ABTest4SearchDate == 'b')
    {
        if((startDate == '' || startDate == '请选择入住日期') && (endDate == ''|| endDate == '请选择退房日期'))
        {
            startDate = '';
            endDate = '';
            deleteCookie('startDate','/','.'+topLevelDomain);
            deleteCookie('endDate','/','.'+topLevelDomain);
        }
        else if(startDate == '请选择入住日期' || startDate.length < 1 )
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
        else if(endDate == '请选择退房日期' || endDate.length < 1)
        {
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
    }
    else
    {
        if((startDate == '请选择入住日期' && endDate == '请选择退房日期') || (startDate.length < 1 && endDate.length < 1))
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            $('#calendar_btn_s').click();
            return ;
        }
        else if(startDate == '请选择入住日期' || startDate.length < 1 )
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
        else if(endDate == '请选择退房日期' || endDate.length < 1)
        {
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
    }
    var   type="^[0-9]*[1-9][0-9]*$";
    var   re   =   new   RegExp(type);


    if(searchCity.match(re) != null)
    {
        $.ajax({
            type:"get",
            url:XZWebUrlWriter.getAjax_CheckLodgeUnitUrl(searchCity),
            async : false,
            success:function(data){
               if(data)
               {
                   var obj = eval("("+data+")");
                    if(obj['error'] == '1')
                   {
                        $('#tip_searchcity').html(obj['errormsg']);
                        $('#tip_searchcity').show();
                        return;
                   }else
                    {
                        if(isOpenBlank == '1')
                        {
                            openNewPage(obj['detailurl']);
                        }else
                        {
                            location.href = obj['detailurl'];
                        }
                        return;
                    }
               }

            }

        })
    }else
   {
    if(pageType == 'search')
        cityDomain = '';
    $.ajax({
        type: "get",
        url:XZWebUrlWriter.getAjax_CheckSearchConditionUrl(searchCity,cityDomain,startDate,endDate),
        async : false,
        error : function (XMLHttpRequest, textStatus, errorThrown){

            revoltReptile(XMLHttpRequest);
        },
        success: function(data,textStatus,XMLHttpRequest) {
            revoltReptile(XMLHttpRequest);
            if(data)
            {
                var dataObj = eval("("+data+")");
                if(dataObj['error'] == '1')
                {
                    if(dataObj['cityInfo'])
                {
                    $('#tip_searchcity').html(dataObj['cityInfo']);
                    $('#tip_searchcity').show();
                };
                if(dataObj['dateInfo'])
                {
                    $('#tip_enddate').html(dataObj['dateInfo']);
                    $('#tip_enddate').show();
                };
                //setTimeout(function() { $('#tip_searchcity').hide() }, 4000);
                 setTimeout(function() { $('#tip_enddate').hide() }, 4010);
                 if($('#actionname').val()=='Front_Search'){
                        alert('对不起，没有找到相应的结果');
                        location.reload();
                      }
                }
                else
                {
                    var city = dataObj['city'] ;
                    var paramArray = new Array();
                    var paramStr = '';
                    if(startDate != '')
                    {
                        paramArray.push('startDate='+startDate);
                    }
                    if(endDate != '')
                    {
                        paramArray.push('endDate='+endDate);
                    }
                    if(searchPutKey != '' && searchPutKey != null && landmarktype != districtSearchKey)
                    {
                        paramArray.push('putkey='+encodeURIComponent(ignoreSpaces(searchPutKey)));
                    }
                    else if(searchKey != '' && searchKey != null && landmarktype != districtSearchKey)
                    {
                        paramArray.push('putkey='+encodeURIComponent(ignoreSpaces(searchKey)));
                    }


                    paramStr = paramArray.join('&');
                    if(landmarktype == districtSearchKey)
                    {
                        defaulturl = searchLid+"-duanzufang-8/";
                        if(paramStr)
                            defaulturl += "?";
                        jumpUrl = window.location.protocol + "//" + city + "." + topLevelDomain + "/" + defaulturl+paramStr;
                        if(isOpenBlank == '1')
                        {
                            openNewPage(jumpUrl);
                        }else
                        {
                            location.href = jumpUrl;
                        }
                        return false;
                    }
                    if(defaulturl)
                    {
                        defaulturl += "-duanzufang-20/";
                        if(paramStr)
                            defaulturl += "?";
                        jumpUrl = window.location.protocol + "//" + city + "." + topLevelDomain + "/" + defaulturl+paramStr;
                        if(isOpenBlank == '1')
                        {
                            openNewPage(jumpUrl);
                        }else
                        {
                            location.href = jumpUrl;
                        }
                        return false;
                    }

                    if(startDate != '' || endDate != '')
                        paramStr = paramArray.join('&');
                    if(paramStr !='')
                    {
                        if(searchLid)
                        {
                            if(searchKey)
                                var paramVal = encodeURIComponent(searchKey) + "_" + searchLid + "S-duanzufang-20/";
                            else if(searchPutKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_" + searchLid + "M-duanzufang-20/";

                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else
                        {
                            var paramVal = "";
                            if(searchPutKey)
                            {
                                paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_M-duanzufang-20/";
                            }
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;

                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                    }
                    else
                    {
                        if(!searchLid && searchPutKey)
                        {
                            var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_M-duanzufang-20/";
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else if(searchLid && (searchPutKey || searchKey))
                        {
                            if(searchKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchKey)) + "_" + searchLid + "S-duanzufang-20/";
                            if(searchPutKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_" + searchLid + "M-duanzufang-20/";
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else
                        {
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/";
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }

                        }
                    }
                }
            }
        }
    });
   }
}

function debug(str){
    if(window.console){
        console.debug(str);
        return;
    }

    var d = $('#debug');
    if(d.length == 0){
        $(document.body).append('<div id="debug"></div>');
        d = $('#debug');
    }

    var item = $('<div></div>').text(str);
    d.append(item);
}
//compare date
function compareDate(date){
    var newDate = date.split("-");
    var dateY = newDate[0];
    var dateM = newDate[1];
    var dateD = newDate[2];
    return Date.parse(dateM + "/" + dateD + "/" + dateY);
}

function checkBankCardNo(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);

    var first15Num=bankno.substr(0,bankno.length-1);
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();
    var arrJiShu2=new Array();

    var arrOuShu=new Array();
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){
            if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
            else
                arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();
    var jishu_child2=new Array();
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }

    var sumJiShu=0;
    var sumOuShu=0;
    var sumJiShuChild1=0;
    var sumJiShuChild2=0;
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhm= 10-k;

    if(lastNum==luhm){
        return true;
    }
    else{
        return false;
    }
}
function is_array(test)
{
    if(typeof test == 'object' && typeof test.sort == 'function' && typeof test.length == 'number')
    {
        return true;
    }
    else
    {
        return false;
    }
}
function gaClickSta(strEvent)
{
}
function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    splitstring = string.split(" ");
    for(i = 0; i < splitstring.length; i++)
        temp += splitstring[i];
    return temp;
}
function  checkIAgree(){
    $("#tip_affirm").css("display","none");
}

function check_all(obj){$("input." + obj).each(function(i){this.checked = true;});}
function check_no(obj){$("input." + obj).each(function(i){this.checked = false;});}
function check_fan(obj){$("input." + obj).each(function(i){this.checked = this.checked == true ? false : true;});}
function check_str(obj){str = new String();$("input." + obj).each(function(i){str = this.checked == true ? str + this.value + "," : str;});str = str.substr("0", str.lastIndexOf(","));return str;}

function keyFocus(iptName,defValue)
{

    var _text = $("#"+iptName).val();

    if(_text == defValue)
    {
        $("#"+iptName).attr("value", '');
        $("#"+iptName).attr("style",'color:#555');
    }
}
function keyBlur(iptName,defValue)
{
    var _text = $("#"+iptName).val();
    if(_text == '')
    {
        $("#"+iptName).attr("value",defValue);
        $("#"+iptName).attr("style",'color:#999');
    }
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if(endstr == -1) {
        endstr = document.cookie.length;
    }
    return document.cookie.substring(offset, endstr);
}
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen) {
        j = i + alen;
        if(document.cookie.substring(i, j) == arg){
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if(i === 0){
            break;
        }
    }
    return '';
}
function deleteCookie(name,path,domain) {
    var exp = new Date();
    var cval = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) ;
}

function deleteCookie4Search(name,path,domain) {
    var exp = new Date();
    var cval = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) ;
}

function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var exp = (argc > 2) ? argv[2] : 90;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    var expires = new Date();
    deleteCookie(name,path,domain);
    if(exp < 365) {
        expires.setTime(expires.getTime() + (exp*24*60*60*1000));
    }else{
        expires.setTime(expires.getTime() + (exp));
    }
    document.cookie = name + "=" + value +
        "; expires=" + expires.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) +
        ((secure === true) ? "; secure" : "");
}
function orderDetail(lodgeId,sameRoomNum,startDate,endDate)
{
    content = '';
    XZWebAjax.get(XZWebUrlWriter.getAjax_GetBookLodgeUnitDetailUrl(lodgeId,sameRoomNum,startDate,endDate),{},false,function(data){
        content = data;
    },'html');
    $('#lodgeUnitPriceDetail').dialog({
        width : 750,
        //height:520,
        resizable: false,
        modal:false,
        position: "center"
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
    {
        $('#lodgeUnitPriceDetail').dialog({
            bgiframe: true,
            height:520
        });
    }

    $('#lodgeUnitPriceDetail').html(content);
    $('#lodgeUnitPriceDetail').dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('.ui-widget-content').css('border','0px');
}

function priceOrder()
{
    var bookorderid = $("#bookOrderId").val();
    orderPriceDetail(bookorderid);
}

function orderPriceDetail(bookOrderId,url)
{
    var url = (typeof url == "undefined") ? XZWebUrlWriter.getAjax_GetOrderPriceDetailUrl(bookOrderId) : url;
     content = '';
        $.ajax({
            type: "get",
            url: url,
            async:false,
            success: function(data) {
                content = data;
            }
        });
    $('#lodgeUnitPriceDetail').dialog({
        width : 750,
        resizable: true,
        modal:false,
        position: "center"
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
    {
        $('#lodgeUnitPriceDetail').dialog({
            height:520
        });
    }
    $('#lodgeUnitPriceDetail').html(content);
    $('#lodgeUnitPriceDetail').dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('.ui-widget-content').css('border','0px');
}

function dateTransform(date)
{
    var newDate = new Date(date);
    var dateY = newDate.getFullYear();
    var dateM = getFullDate(newDate.getMonth()+1);
    var dateD = getFullDate(newDate.getDate());
    return dateY + "-" + dateM + "-" + dateD;
}
function getSubCHString(value,len)
{
    if(value.length <= len)
        return value;
    var strlen = 0;
    var strnum = 0;
    var str = "";
    for(var i = 0;i < value.length;i++)
    {
        strlen ++;
        if(value.charCodeAt(i) <= 128)
        {
            strnum++;
        }
        if(strnum > len)
        {
            strnum = len;
        }
        str += value.charAt(i);
        if(strlen >= (len + strnum)){
            return str + '...';
        }
    }
    return str + '...';
}
$(function(){
    window.setTimeout(getLayzeLoadData,1000);
})
function getLayzeLoadData()
{
    var layzeloadObj = $('layzeload');
    if(layzeloadObj.length<0)
    {
        return false;
    }
    layzeloadObj.each(function(){
        var turl = encodeURIComponent($(this).attr('turl'));
        var memkey = $(this).attr('memkey');
        var memtimeout = $(this).attr('memtimeout');
        var jsexecafterload = $(this).attr('jsexecafterload');
        var id = 'load_'+$(this).attr('key');

        XZWebAjax.get(XZWebUrlWriter.getAjax_GetLazyInfoUrl(memkey,memtimeout,turl),{},false,function(data){
            $("#"+id).html(data);
            if (jsexecafterload)
                eval(jsexecafterload);
        },'html');
    })
    return false;
}
function isIe6()
{
    if($.browser.msie && $.browser.version=="6.0")
    {
        return true;
    }
    return false;
}
function changeDate(startDate,days)
{
    // 参数表示在当前日期下要增加的天数
    var now = new Date(startDate.replace(/-/g, "/"));
    // + 1 代表日期加，- 1代表日期减
    now.setDate((now.getDate() + 1 * days));
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
}
function openNewPage(url)
{
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "openwin");
    document.body.appendChild(a);
    a.click();
}
function ajaxHandleCall(req,callback)
{
    if(!req || "object" !== typeof req)
    {
        return false;
    }

    $.ajax({
        tyep : req.type,
        url : req.url,
        data : req.data + '&_t=' + new Date().getTime(),
        success : function(data){
            if(data)
            {
                callback(data);
            }
        }
    });
}
function isDefined(property)
{
    return 'undefined' !== typeof property;
}
function clickEvent(urlTracker,pageType)
{
    if(!isDefined(pageType) && !isDefined(urlTracker) && !isDefined(_paq))
        return false;

    urlTracker = 'http://www.trackerlink.com/'+pageType+'/'+urlTracker;
    _paq.push(['trackLink', urlTracker, 'link']);
}
function searchEvent(pageType)
{
    var defaultStartDate = $('#defaultstartdate').val();
    var defaultEndDate = $('#defaultenddate').val();
    var startDate = $('#startdate').val();
    var endDate = $('#enddate').val();
    var url="defaultstartdate="+defaultStartDate+"&defaultenddate="+defaultEndDate+"&startdate="+startDate+"&enddate="+endDate;
    //clickEvent(url, pageType);
}
function flashChecker()
{
    var hasFlash=0;         //是否安装了flash
    var flashVersion=0; //flash版本
    var isIE=/*@cc_on!@*/0;      //是否IE浏览器

    if(isIE)
    {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(swf) {
            hasFlash=1;
            VSwf=swf.GetVariable("$version");
            flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    }else{
        if (navigator.plugins && navigator.plugins.length > 0)
        {
            var swf=navigator.plugins["Shockwave Flash"];
            if (swf)
            {
                hasFlash=1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i)
                {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {f:hasFlash,v:flashVersion};
}
function initDisplayLodgeUnitIndex(luidAndIndex)
{
    clickEvent('luidAndIndex_'+luidAndIndex,'search');
}
function setDialogHeight(dialogId)
{
    var dialogHeight = $("#"+dialogId).height();
    $('#'+dialogId).css({marginTop:'-'+dialogHeight/2+'px'});
    $('.ui-dialog-titlebar').hide();
}
function closeDialog(dialogId)
{
    $("#"+dialogId).dialog("close");
    return false;
}
function dateDiff(date1,date2)
{
    return parseInt((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}
function CloseWebPage(){
    if (navigator.userAgent.indexOf("MSIE") > 0) {  //IE浏览器
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null; window.close();
        }
        else {
            window.open('', '_top'); window.top.close();
        }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {  //火狐浏览器
        window.location.href = 'about:blank ';
    }
    else {     //其他浏览器
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}

function chkstrlen(str) {     //检查输入的真实姓名的长度
    var strlen = 0;
    for(var i = 0;i < str.length; i++) {
        if(str.charCodeAt(i) > 255) { //如果是汉字，则字符串长度加2
            strlen += 2;
        }
        else {
            strlen++;
        }
    }
    return   strlen;
}
//校验姓名
function chkName(str){
   var regName =/^[\u4e00-\u9fa5,\·]{2,10}$/;
   if(regName.test(str)){
      return true;
   }else{
      return false
   }
}
//校验身份证
function chkIdCard(str){
   var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   if(regIdNo.test(str)){
      return true
   }else{
      return false
   }

}
function scrollPage(obj)
{
    var windowHeight = $(window).height();
    var offsetTop = parseInt(obj.offset().top);
    var scrollTop = $(document).scrollTop();
    var suggestionHeight = obj.height();
    if( (windowHeight - (offsetTop - scrollTop)) - suggestionHeight < 0 ) {
        var newTopHeight = scrollTop + (suggestionHeight + 10 ) - (windowHeight - (offsetTop - scrollTop));
        $('html,body').animate({ scrollTop: newTopHeight }, 300);
    }

}

function numToStr(n,num) {
    numStr = num.toString();
    var l = numStr.length;
    for (var i=1; i<= n - l;++i) {
        numStr = '0'+numStr;
    }
    return numStr;
}

Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str = str.replace(/yyyy|YYYY/,this.getFullYear());
    str = str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str = str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
    str = str.replace(/M/g,this.getMonth()+1);

    str = str.replace(/w|W/g,Week[this.getDay()]);

    str = str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str = str.replace(/d|D/g,this.getDate());

    str = str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str = str.replace(/h|H/g,this.getHours());
    str = str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str = str.replace(/m/g,this.getMinutes());

    str = str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str = str.replace(/s|S/g,this.getSeconds());

    return str;
};


function revoltReptile(XMLHttpRequest){
    var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
    if(reaponseHeader){
        var urls = reaponseHeader.split('slideRedirect=');
        var host = urls[0] + 'slideRedirect=';
        if (urls.length > 1) {
            host = host + encodeURIComponent(urls[1]);
        }
        window.location.href = host;
    }
};


 
 function getShortWeekNameByDate(date)
{
    var week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    return week[new Date(date).getDay()];
}
function getDateDiff(sDate1, sDate2){
    var sDate = new Date(sDate1.replace(/-/g, "/"));
    var eDate = new Date(sDate2.replace(/-/g, "/"));
    var timediff = eDate.getTime() - sDate.getTime();
    var daydiff = parseInt(timediff/1000/60/60/24);
    return daydiff;
}  
function compareBirthDate(date1,date2)
{
    var newDate1 = date1.split('-');
    var dateY1 = newDate1[0];
    var dateM1 = newDate1[1];
    var dateD1 = newDate1[2];

    var newDate2 = date2.split('-');
    var dateY2 = newDate2[0];
    var dateM2 = newDate2[1];
    var dateD2 = newDate2[2];

    if(dateY1<dateY2)
    {
        return -1;
    }
    else if(dateY1>dateY2)
    {
        return 1;
    }
    else if(dateY1 == dateY2)
    {
        if(dateM1<dateM2)
        {
            return -1;
        }
        else if(dateM1>dateM2)
        {
            return 1;
        }
        else if(dateM1 == dateM2)
        {
            if(dateD1<dateD2)
            {
                return -1;
            }
            else if(dateD1>dateD2)
            {
                return 1;
            }
            else if(dateD1 == dateD2)
            {
                return 0;
            }
        }
    }
}
 
 var numToStr = function(n,num) {
    numStr = num.toString();
    var l = numStr.length;
    for (var i=1; i<= n - l;++i) {
        numStr = '0'+numStr;
    }
    return numStr;
}
try{
    var calendarV2 = function(e, options) {
        options = options || {};

        this.abroad = options.abroad || false;
        this.cityName = options.cityName || '目的地';
        this.timeZone = options.timeZone || '+08:00';

        this.classWeek   = options.classWeek || 'calendar-week';
        this.classTitle   = options.classTitle || 'calendar-title';
        this.classMonth   = options.classMonth || 'calendar-month';
        this.classDay   = options.classDay || 'calendar-day';
        this.classDayBase   = options.classDayBase || 'line2';
        this.classDayShow   = options.classDayShow || 'show-date';
        this.classDaySelect = options.classDaySelect || 'cal_select';
        this.classDayPass = options.classDayPass || 'old';
        this.classDayUnSelectAble = options.classDayUnSelectAble || 'unselectable';
        this.classPink = options.classPink || 'pink';
        this.prependHtml   = options.prependHtml || '';
        this.today   = options.today || this.getDate();

        this.fillDayInfo = options.fillDayInfo || null;
        this.getDayInfo  = options.getDayInfo || null;

        this.checkState = 0;
        this.doColor = false;

        this.checkIn      = options.checkIn || null;
        this.checkOut     = options.checkOut || null;
        this.checkDayChange = options.checkDayChange || function(){};

        if(this.abroad && this.checkIn && this.getYmd(this.checkIn) < this.getYmd(this.today)){
            this.checkIn = this.today;
            this.checkDayChange();
            if(this.getYmd(this.checkIn) == this.getYmd(this.checkOut)){
                this.checkIn      = null;
                this.checkOut     = null;
                $('#clearSelect').click();
            }
        }

        this.setDay = this.getDate();

        this.dateArray      = [];
        this.monthArray     = [];
        this.calenderHTML   = '';
        this.clearDateHtml   = '';
        this.preMonthHtml   = '';
        this.nextMonthHtml   = '';
        this.totalMohth     = 2;
        this.firstGray = false;

        this.e = typeof(e) == 'object' ? e : $(e);

        this.init();

        return(this);
    }
    calendarV2.prototype.init = function() {
        this.dateArray      = [];
        this.monthArray     = [];
        this.calenderHTML   = '';
        this.checkState = 0;
        this.gengerateCalArray().gengerateCalHtml().fillCalender();
        this.bindEvent();
        return(this);
    }
    calendarV2.prototype.preMonth = function() {
        if((this.today.getMonth() == this.firstDate.m) && (this.today.getFullYear() == this.firstDate.y) ){
            return false;
        }
        else {
            this.setDay.setDate(1);
            (this.firstDate.m == 0) ? (this.setDay.setMonth(11)) : this.setDay.setMonth(this.firstDate.m-1);
            (this.firstDate.m == 0) ? (this.setDay.setFullYear(this.firstDate.y-1)) : this.setDay.setFullYear(this.firstDate.y);
            this.dateArray      = [];
            this.monthArray     = [];
            this.calenderHTML   = '';
            this.checkState = 0;
            this.gengerateCalArray().gengerateCalHtml().fillCalender();
            this.bindEvent();
            return(this);
        }
    }
    calendarV2.prototype.nextMonth = function() {
        this.setDay.setDate(1);
        (this.lastDate.m == 0) ? this.setDay.setMonth(11) : (this.setDay.setMonth(this.lastDate.m-1));
        (this.lastDate.m == 0) ? this.setDay.setFullYear(this.lastDate.y-1) :this.setDay.setFullYear(this.lastDate.y);
        this.dateArray      = [];
        this.monthArray     = [];
        this.calenderHTML   = '';
        this.checkState = 0;
        this.gengerateCalArray().gengerateCalHtml().fillCalender();
        this.bindEvent();
        return(this);
    }
    calendarV2.prototype.setYmd = function(y,m,d, isDisplay) {
        var cdate = this.getDate();
        m = isDisplay ? m - 1 : m;
        cdate.setDate(1);
        cdate.setMonth(m);
        cdate.setFullYear(y);
        cdate.setDate(d);
        return cdate;
    }
    calendarV2.prototype.getYmd = function(s) {
        //return s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate();// + '  ' + s.getDay();
        return s.getFullYear() + '-' + numToStr(2,s.getMonth() + 1) + '-' + numToStr(2,s.getDate());// + '  ' + s.getDay();
    }

    calendarV2.prototype.gengerateCalArray = function() {
        //this.dateArray = [];
        for (var i = 0; i <= this.totalMohth; i++) {
            var toMonth = this.setDay.getMonth();
            for (var j = 1; j <= 37; j++) {
                this.setDay.setDate(j);
                if (this.setDay.getMonth() != toMonth){
                    break;
                }
                this.dateArray.push({y:this.setDay.getFullYear(),m:this.setDay.getMonth(),d:this.setDay.getDate(),w:this.setDay.getDay()});
            };
        };
        this.firstDate = this.dateArray[0];
        this.lastDate  = this.dateArray[this.dateArray.length -1];
        return(this);
    }

    calendarV2.prototype.gengerateCalHtml = function() {
        this.calenderHTML = '';
        this.monthArray = [];
        var m = -1;
        var len = this.dateArray.length - 1;
        for (var i = 0; i <= len; i++) {
            var day = this.dateArray[i];
            var cc = this.setYmd(day.y,day.m,day.d,false);
            if (m == -1) m = day.m;
            if (m != day.m) {
                this.calenderHTML += this.genMonth();
                this.monthArray = [];
                m = day.m;
            }
            this.monthArray.push(day);
        };
        return(this);
    }

    calendarV2.prototype.genDate = function(day) {
        var writeDay = this.setYmd(day.y,day.m,day.d,false);
        var old = '';
        var unselectable = '';
        var checkDay = '';
        var isToday = this.getYmd(writeDay) == this.getYmd(this.today) ? 1 : 0;
        var dayText = isToday && !this.abroad ? '今天' : day.d;
        if (writeDay < this.today) old = this.classDayPass;
        if (writeDay>=this.today && writeDay < this.checkIn && this.checkOut == null) unselectable = this.classDayUnSelectAble;
        if (    (this.checkIn && writeDay <= this.checkOut && writeDay > this.checkIn) ||
            (this.checkOut && this.getYmd(writeDay) == this.getYmd(this.checkOut)) ||
            (this.checkIn && this.getYmd(writeDay) == this.getYmd(this.checkIn))
        ) {
            checkDay = this.classDaySelect;
        }
        if (this.checkIn && this.getYmd(writeDay) == this.getYmd(this.checkIn)) dayText = '入住';
        if (this.checkOut && this.getYmd(writeDay) == this.getYmd(this.checkOut)) dayText = '离开';

        if(old) {
            var li_classes = [this.classDayBase, old, checkDay];
        }
        else if(unselectable) {
            var li_classes = [this.classDayBase, unselectable];
        }
        else {
            var li_classes = [this.classDayBase, this.classDayShow, checkDay];
        }
        var li_html =  '<li class="'+ li_classes.join(' ') +'" d="'+day.d+'" m="'+day.m+'" y="'+day.y+'" w="'+day.w+'" today="'+isToday+'" ymd="'+this.getYmd(writeDay)+'" ><span>'+ dayText +'</span>';
        var new_html = '';
        if ( this.fillDayInfo) new_html = this.fillDayInfo(li_html);
        return new_html == '' ? li_html : new_html;
    }

    calendarV2.prototype.genMonth = function() {
        var dayHtml = '';
        var len = this.monthArray.length - 1;
        for (var i = 0; i <= len ; i++) {
            var day = this.monthArray[i];
            if (i==0) dayHtml+=this.genEmptyDay(day.w);
            var dayHtml = dayHtml + this.genDate(day);
        };
        dayHtml+=this.genEmptyDay(6 - day.w);
        var preHtml =
            '<div class="'+this.classMonth+'">'+
            '<div class="'+this.classTitle+'">'+
            '<h2 cury="'+day.y+'" curm="'+(day.m + 1)+'">'+day.y+'-'+(day.m + 1)+'</h2>'+
            '</div>'+
            '<ul class="'+this.classWeek+'">'+
            '<li class="pink">日</li>' +
            '<li>一</li>' +
            '<li>二</li>' +
            '<li>三</li>' +
            '<li>四</li>' +
            '<li>五</li>' +
            '<li class="pink">六</li>' +
            '</ul>';
        var afterHtml = '</div>';
        return preHtml + '<ul class="'+this.classDay+'">'+dayHtml+'</ul>' + afterHtml;
    }

    calendarV2.prototype.genEmptyDay = function(num) {
        var emptyday = '';
        for (var i = 1; i<= num; i++) {
            emptyday+='<li class="'+this.classDayPass+' '+this.classDayBase+'"></li>';
        }
        return emptyday;
    }

    calendarV2.prototype.fillCalender = function() {
        if(this.abroad){
            this.e.html(this.prependHtml + this.calenderHTML + this.clearDateHTML()+this.abroadHtml() + this.preMonthHTML() + this.nextMonthHTML());
        }else{
            this.e.html(this.prependHtml + this.calenderHTML + this.clearDateHTML() + this.preMonthHTML() + this.nextMonthHTML());
        }
        // this.e.find('.' + this.classMonth).first().addClass('paddingR10');
        // this.e.find('.' + this.classMonth).first().children('.' + this.classTitle).addClass('width_274');
        return(this);
    }
    calendarV2.prototype.clearSelect = function() {
        var _this = this;
        this.e.find('.checkedday,' + '.' + this.classDaySelect).each(function(){
            if ($(this).attr('today') == '1' && !_this.abroad) {
                $(this).find('span').html('今天');
            } else {
                $(this).find('span').html($(this).attr('d'));
            }
            if (_this.fillDayInfo) _this.fillDayInfo($(this));

        })
            .removeClass('checkedday');
        this.e.find('.' + this.classDaySelect).removeClass(this.classDaySelect);
        this.e.find('.' + this.classDayUnSelectAble).addClass(this.classDayShow).removeClass(this.classDayUnSelectAble);
        $("#clearSelect").removeClass(_this.classPink);
        if(this.checkIn && this.checkOut) {
            this.e.hide();
        }
        this.checkOut = null;
        this.checkIn  = null;
        this.firstGray = false;
        return(this);
    }

    calendarV2.prototype.bindEvent = function() {
        var _this = this;

        this.e.find('.' + this.classDayBase).on('click', function(){
            if ($(this).hasClass(_this.classDayPass) || $(this).hasClass(_this.classDayUnSelectAble)) return false;
            if ($(this).hasClass('cal_noRoom')) return false;
            if ($(this).hasClass(_this.classDaySelect) && $('.checkedday').index(this) == 0) return false;
            var thisday = $(this).find('span');
            if (!_this.checkIn && !_this.checkOut) {
                $('.checkedday').removeClass('checkedday');
                $(this).addClass('checkedday');
            } else if (_this.checkIn && !_this.checkOut) {
                $(this).addClass('checkedday');
            } else if (_this.checkIn && _this.checkOut) {
                _this.clearSelect();
                _this.e.show();
                $(this).addClass('checkedday');
            } else if (!_this.checkIn && _this.checkOut) {
                _this.clearSelect();
            }
            $("#clearSelect").addClass(_this.classPink);
            $(this).toggleClass(_this.classDaySelect);
            _this.refreshCheckState();
        })
        return(this);
    }
    calendarV2.prototype.refreshCheckState = function() {
        _this = this;
        var checkedday = this.e.find('.checkedday');
        var checkLast = checkedday.last();
        checkLast.find('span').html('离开');

        if(!_this.checkIn) {
            var checkFirst = checkedday.first();
            checkFirst.find('span').html('入住');
            var enterday = checkFirst.attr('ymd');
        }

        if (_this.fillDayInfo) {
            this.fillDayInfo(checkLast);
            if(!_this.checkIn) {
                this.fillDayInfo(checkFirst);
            }
        }

        var leaveday = checkLast.attr('ymd');
        this.doColor = leaveday == enterday ? false : true;

        doColorState = false;

        if (!_this.checkIn && checkFirst.length) {
            this.checkIn = this.setYmd(checkFirst.attr('y'),checkFirst.attr('m'),checkFirst.attr('d'));
        }
        if(leaveday != enterday) {
            this.checkOut = this.setYmd(checkLast.attr('y'),checkLast.attr('m'),checkLast.attr('d'));
        }
        this.e.find('.' + this.classDayBase).not('.old').each(function(){
            var liYmd = $(this).attr('ymd');
            liYmd = _this.getDate(liYmd.replace(/-/g, "/"));
            if (_this.doColor) {
                if(!_this.checkIn) {
                    if ($(this).hasClass(_this.classDaySelect)) doColorState = !doColorState;
                    if (doColorState){
                        $(this).addClass(_this.classDaySelect);
                        $(this).addClass('checkedday');
                        if (_this.getDayInfo) _this.getDayInfo($(this));
                    }
                }
                else {
                    if( (_this.getYmd(liYmd) >= _this.getYmd(_this.checkIn))  && ( _this.getYmd(liYmd) <= _this.getYmd(_this.checkOut)) ) {
                        $(this).addClass(_this.classDaySelect);
                        $(this).addClass('checkedday');
                        if (_this.getDayInfo) _this.getDayInfo($(this));
                    }
                }
            }
            if(_this.getYmd(liYmd) < _this.getYmd(_this.checkIn) ) {
                $(this).addClass(_this.classDayUnSelectAble);
                $(this).removeClass(_this.classDayShow);
            }
            if (_this.fillDayInfo) _this.fillDayInfo($(this));
        })
        this.checkDayChange();
        return(this);
    }
    calendarV2.prototype.resetBeforeCheckInState = function() {
        this.e.find('.' + this.classDayUnSelectAble).addClass(this.classDayShow).removeClass(this.classDayUnSelectAble);
    }
    calendarV2.prototype.clearDateHTML = function() {
        if(this.checkIn){
            var clearHtml = '<div class="bottom_clear_date bottom_clear_date_index"><div class="clear_date ' + this.classPink + '" id="clearSelect">清空日期 </div></div>';
        }
        else {
            var clearHtml = '<div class="bottom_clear_date bottom_clear_date_index"><div class="clear_date" id="clearSelect">清空日期 </div></div>';
        }
        return clearHtml;
    }
    calendarV2.prototype.preMonthHTML = function() {
        if((this.today.getMonth() == this.firstDate.m) && (this.today.getFullYear() == this.firstDate.y)) {
            return '';
        }
        else {
            var preMonth = '<span class="cal_pre" id="preMonth"></span>';
            return preMonth;
        }
    }
    calendarV2.prototype.nextMonthHTML = function() {
        var nextMonth = '<span class="cal_next" id="nextMonth"></span>';
        return nextMonth;
    }
    calendarV2.prototype.abroadHtml = function(){
        var abroadHtml = '<div class="time_stand">以'+this.cityName+'时间为准</div>';
        return abroadHtml;
    }
    calendarV2.prototype.getDate = function(ymd){
        var d = new Date();
        if(ymd){
            d = new Date(ymd);
        }
        if(this.timeZone){
            var timeZone = this.timeZone.split(':')[0];
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            d   = new Date(utc + (3600000*timeZone));
        }
        return d;
    }
}
catch(e){console.log(e);}
 
 function blurImageCode(phone)
{
    var checkcode = $('#imagecode').val();
    var flag = true;
    $('#tip_imagecode').html('').hide();
    if (checkcode == '') {
        $('#tip_imagecode').html('<i></i>请输入验证码').show();
        return false;
    } else if (checkcode.length !=4 ) {
        $('#tip_imagecode').html('<i></i>验证码不正确').show();
        $('#img_imagecode').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
        return false;
    }
    else {
    $.ajax({
        type:'get',
        url : XZWebUrlWriter.getAjax_Front_PicCheckCodeVerify(checkcode,phone),
        async: false,
        success:function(data){
            var dataObj=eval("("+data+")");
            if (dataObj && dataObj.status=='1') {
                $('#tip_imagecode').html('').hide();
                flag = true;
                return true;
            } else {
                $('#tip_imagecode').html(dataObj.errmsg).show();
                $('#img_imagecode').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
                flag = false;
                return false;
            }
        }
    });
    return flag;
    }
}
function blurImageCodeInfo(phone)
{
    var checkcode = $('#imagecodeInfo').val();
    var flag = true;
    $('#tip_imagecode').html('').hide();
    if (checkcode == '') {
        $('#imagecodeInfo').addClass('bor_red');
        $('#tip_imagecode').html('<i></i>请输入验证码').show();
        return false;
    } else if (checkcode.length !=4 ) {
        $('#imagecodeInfo').addClass('bor_red');
        $('#tip_imagecode').html('<i></i>验证码不正确').show();
        $('#img_imagecodeInfo').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
        return false;
    }
    else {
    $.ajax({
        type:'get',
        url : XZWebUrlWriter.getAjax_Front_PicCheckCodeVerify(checkcode,phone),
        dataType : 'json',
        async: false,
        success:function(dataObj){
            if (dataObj && dataObj.status=='1') {
                $('#tip_imagecode').html('').hide();
                 $('#imagecodeInfo').removeClass('bor_red');
                flag = true;
                return true;
            } else {
                $('#imagecodeInfo').addClass('bor_red');
                $('#tip_imagecode').html('<i></i>' + dataObj.errmsg).show();
                $('#img_imagecodeInfo').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
                flag = false;
                return false;
            }
        }
    });
    return flag;
    }
}

function resetCheckcode(imageID,imagecode) 
{ 
    XZWebUrlWriter.getRequest(XZWebUrlWriter.headTest_ReqUrl());
    if(imageID == '' || typeof(imageID)=='undefined')
        imageID='img_imagecode';

    if(imagecode == '' || typeof(imagecode)=='undefined')
        imagecode='imagecode';

    $('#'+imageID).attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
    $('#'+imagecode).val('');   
    return false;
}

 
 var defaultText = '入住离开日期';
var defaultStartText = '选择入住日期';
var defaultEndText = '选择离开日期';
try{

    var execCalendar = function(input,option){
        var inputObj = $(input);
        var autoSearch = option.autoSearch || null;
        var calendar = new calendarV2('#calendar-box', {
            abroad : option.abroad,
            timeZone : option.timeZone,
            cityName : option.cityName,
            checkDayChange:function(){
                if(this.checkIn){
                    var startMonth = (this.checkIn.getMonth() < 9) ? '0'+ (this.checkIn.getMonth()+1) : (this.checkIn.getMonth()+1);
                    var startDate = (this.checkIn.getDate() < 10) ? '0'+ (this.checkIn.getDate()) : this.checkIn.getDate();
                    $('#startdate').val(this.checkIn.getFullYear() + '-' + startMonth + '-' + startDate);
                    $('#enddate').val('');
                    inputObj.val(defaultEndText);
                }
                if(this.checkOut){
                    var searchCity = this.cityName 
                    if(!searchCity || searchCity =='城市或目的地' || searchCity == '城市' || searchCity =='目的地' ){
                        $('#tip_searchcity').html("请选择城市或目的地");
                        $('#tip_searchcity').show();
                    }
                    var endMonth = (this.checkOut.getMonth() < 9) ? '0'+ (this.checkOut.getMonth()+1) : (this.checkOut.getMonth()+1);
                    var endDate = (this.checkOut.getDate() < 10) ? '0'+ (this.checkOut.getDate()) : this.checkOut.getDate();
                    $('#enddate').val(this.checkOut.getFullYear() + '-' + endMonth + '-' + endDate);
                    inputObj.val(this.checkIn.getFullYear() + '-' + (this.checkIn.getMonth()+1) + '-' + this.checkIn.getDate() + '至' + this.checkOut.getFullYear() + '-' + ( this.checkOut.getMonth()+1) + '-' + this.checkOut.getDate());
                    if(this.e){
                        this.e.hide();
                    }
                    $('.icon_searchandremove').show();
                    if(autoSearch) {
                        /*
                           var city = $("#selectcitydomain").val();
                           var jumpUrl = "http://" + city + "." + topLevelDomain + "/?startDate=" + $("#startdate").val() + "&endDate=" + $("#enddate").val() ;
                           location.href = jumpUrl;
                           */
                        $('#filter_confirm').click();
                    }
                }
                scrollPage($('#calendar-box'));
            },
            checkIn: $('#startdate').val() ? new Date($('#startdate').val().replace(/-/g, "/")) : null,
            checkOut: $('#enddate').val() ? new Date($('#enddate').val().replace(/-/g, "/")) : null
        })
        $('#calendar-box').unbind('click');
        $('#calendar-box').on('click','#clearSelect',function(){
            calendar.clearSelect();
            $('#startdate').val('');
            $('#enddate').val('');
            if(autoSearch&&$('#tmpenddate').val()&&$('#tmpstartdate').val()) {
                $('#deldatetime').click();
                $('#filter_confirm').click();
                return false;
            }
            if($('#calendar-box').is(':visible')) {
                inputObj.val(defaultStartText);
            }
            else {
                inputObj.val(defaultText);
            }
        })
        $("#calendar-box").on('click','#preMonth',function(){
            calendar.preMonth();
            scrollPage($('#calendar-box'));
        })
        $("#calendar-box").on('click','#nextMonth',function(){
            calendar.nextMonth();
            scrollPage($('#calendar-box'));
        })
        inputObj.bind('click focus',function(){
            if($('#startdate').val() == '' && $('#enddate').val() == ''){
                inputObj.val(defaultStartText);
            }
            if($('#startdate').val() != '' && $('#enddate').val() != ''){
                calendar.resetBeforeCheckInState();
            }
            calendar.e.show();
            scrollPage($('#calendar-box'));
        })
        inputObj.bind('blur',function(){
            //calendar.e.hide();
        })
    }
    /*
       var transToReadableDate = function(dateobj) {
       return numToStr(2,dateobj.getMonth() + 1) + '-' + numToStr(2,dateobj.getDate());
       }
       if (lastCheckedDay) {
       calender.checkDayChange();
       $('#checkin-checkout').html( transToReadableDate(calender.checkIn) + ' 至 ' + transToReadableDate(calender.checkOut) );
       $('#total-days-show').text('共' + $('#total-days').text() + '晚');
       }
       $('#date-selected').on(EVENT_TAP, function(e){
       if (!calender.checkIn) {
       xz.ui.message('请选择入住日期');
       return;
       }
       if (!calender.checkOut)  {
       xz.ui.message('请选择离开日期');
       return;
       }
       $('#backto-index').trigger('click');
       $('#checkin-checkout').html( transToReadableDate(calender.checkIn) + ' 至 ' + transToReadableDate(calender.checkOut) );
       $('#total-days-show').text('共' + $('#total-days').text() + '晚');
       });
       */
    $('#calendar_btn_s').click(function(){
            $("#startenddate").click();
    })
}
catch(e){}
 
 /* Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
(function( w ){

	"use strict";

	//exposed namespace
	var respond = {};
	w.respond = respond;

	//define update even in native-mq-supporting browsers, to avoid errors
	respond.update = function(){};

	//define ajax obj
	var requestQueue = [],
		xmlHttp = (function() {
			var xmlhttpmethod = false;
			try {
				xmlhttpmethod = new w.XMLHttpRequest();
			}
			catch( e ){
				xmlhttpmethod = new w.ActiveXObject( "Microsoft.XMLHTTP" );
			}
			return function(){
				return xmlhttpmethod;
			};
		})(),

		//tweaked Ajax functions from Quirksmode
		ajax = function( url, callback ) {
			var req = xmlHttp();
			if (!req){
				return;
			}
			req.open( "GET", url, true );
			req.onreadystatechange = function () {
				if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
					return;
				}
				callback( req.responseText );
			};
			if ( req.readyState === 4 ){
				return;
			}
			req.send( null );
		},
		isUnsupportedMediaQuery = function( query ) {
			return query.replace( respond.regex.minmaxwh, '' ).match( respond.regex.other );
		};

	//expose for testing
	respond.ajax = ajax;
	respond.queue = requestQueue;
	respond.unsupportedmq = isUnsupportedMediaQuery;
	respond.regex = {
		media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
		keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
		comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
		urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
		findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
		only: /(only\s+)?([a-zA-Z]+)\s?/,
		minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
		maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
		minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
		other: /\([^\)]*\)/g
	};

	//expose media query support flag for external use
	respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

	//if media queries are supported, exit here
	if( respond.mediaQueriesSupported ){
		return;
	}

	//define vars
	var doc = w.document,
		docElem = doc.documentElement,
		mediastyles = [],
		rules = [],
		appendedEls = [],
		parsedSheets = {},
		resizeThrottle = 30,
		head = doc.getElementsByTagName( "head" )[0] || docElem,
		base = doc.getElementsByTagName( "base" )[0],
		links = head.getElementsByTagName( "link" ),

		lastCall,
		resizeDefer,

		//cached container for 1em value, populated the first time it's needed
		eminpx,

		// returns the value of 1em in pixels
		getEmValue = function() {
			var ret,
				div = doc.createElement('div'),
				body = doc.body,
				originalHTMLFontSize = docElem.style.fontSize,
				originalBodyFontSize = body && body.style.fontSize,
				fakeUsed = false;

			div.style.cssText = "position:absolute;font-size:1em;width:1em";

			if( !body ){
				body = fakeUsed = doc.createElement( "body" );
				body.style.background = "none";
			}

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.fontSize = "100%";
			body.style.fontSize = "100%";

			body.appendChild( div );

			if( fakeUsed ){
				docElem.insertBefore( body, docElem.firstChild );
			}

			ret = div.offsetWidth;

			if( fakeUsed ){
				docElem.removeChild( body );
			}
			else {
				body.removeChild( div );
			}

			// restore the original values
			docElem.style.fontSize = originalHTMLFontSize;
			if( originalBodyFontSize ) {
				body.style.fontSize = originalBodyFontSize;
			}


			//also update eminpx before returning
			ret = eminpx = parseFloat(ret);

			return ret;
		},

		//enable/disable styles
		applyMedia = function( fromResize ){
			var name = "clientWidth",
				docElemProp = docElem[ name ],
				currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
				styleBlocks	= {},
				lastLink = links[ links.length-1 ],
				now = (new Date()).getTime();

			//throttle resize calls
			if( fromResize && lastCall && now - lastCall < resizeThrottle ){
				w.clearTimeout( resizeDefer );
				resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
				return;
			}
			else {
				lastCall = now;
			}

			for( var i in mediastyles ){
				if( mediastyles.hasOwnProperty( i ) ){
					var thisstyle = mediastyles[ i ],
						min = thisstyle.minw,
						max = thisstyle.maxw,
						minnull = min === null,
						maxnull = max === null,
						em = "em";

					if( !!min ){
						min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}
					if( !!max ){
						max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}

					// if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
					if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
						if( !styleBlocks[ thisstyle.media ] ){
							styleBlocks[ thisstyle.media ] = [];
						}
						styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
					}
				}
			}

			//remove any existing respond style element(s)
			for( var j in appendedEls ){
				if( appendedEls.hasOwnProperty( j ) ){
					if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
						head.removeChild( appendedEls[ j ] );
					}
				}
			}
			appendedEls.length = 0;

			//inject active styles, grouped by media type
			for( var k in styleBlocks ){
				if( styleBlocks.hasOwnProperty( k ) ){
					var ss = doc.createElement( "style" ),
						css = styleBlocks[ k ].join( "\n" );

					ss.type = "text/css";
					ss.media = k;

					//originally, ss was appended to a documentFragment and sheets were appended in bulk.
					//this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
					head.insertBefore( ss, lastLink.nextSibling );

					if ( ss.styleSheet ){
						ss.styleSheet.cssText = css;
					}
					else {
						ss.appendChild( doc.createTextNode( css ) );
					}

					//push to appendedEls to track for later removal
					appendedEls.push( ss );
				}
			}
		},
		//find media blocks in css text, convert to style blocks
		translate = function( styles, href, media ){
			var qs = styles.replace( respond.regex.comments, '' )
					.replace( respond.regex.keyframes, '' )
					.match( respond.regex.media ),
				ql = qs && qs.length || 0;

			//try to get CSS path
			href = href.substring( 0, href.lastIndexOf( "/" ) );

			var repUrls = function( css ){
					return css.replace( respond.regex.urls, "$1" + href + "$2$3" );
				},
				useMedia = !ql && media;

			//if path exists, tack on trailing slash
			if( href.length ){ href += "/"; }

			//if no internal queries exist, but media attr does, use that
			//note: this currently lacks support for situations where a media attr is specified on a link AND
				//its associated stylesheet has internal CSS media queries.
				//In those cases, the media attribute will currently be ignored.
			if( useMedia ){
				ql = 1;
			}

			for( var i = 0; i < ql; i++ ){
				var fullq, thisq, eachq, eql;

				//media attr
				if( useMedia ){
					fullq = media;
					rules.push( repUrls( styles ) );
				}
				//parse for styles
				else{
					fullq = qs[ i ].match( respond.regex.findStyles ) && RegExp.$1;
					rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
				}

				eachq = fullq.split( "," );
				eql = eachq.length;

				for( var j = 0; j < eql; j++ ){
					thisq = eachq[ j ];

					if( isUnsupportedMediaQuery( thisq ) ) {
						continue;
					}

					mediastyles.push( {
						media : thisq.split( "(" )[ 0 ].match( respond.regex.only ) && RegExp.$2 || "all",
						rules : rules.length - 1,
						hasquery : thisq.indexOf("(") > -1,
						minw : thisq.match( respond.regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
						maxw : thisq.match( respond.regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
					} );
				}
			}

			applyMedia();
		},

		//recurse through request queue, get css text
		makeRequests = function(){
			if( requestQueue.length ){
				var thisRequest = requestQueue.shift();

				ajax( thisRequest.href, function( styles ){
					translate( styles, thisRequest.href, thisRequest.media );
					parsedSheets[ thisRequest.href ] = true;

					// by wrapping recursive function call in setTimeout
					// we prevent "Stack overflow" error in IE7
					w.setTimeout(function(){ makeRequests(); },0);
				} );
			}
		},

		//loop stylesheets, send text content to translate
		ripCSS = function(){

			for( var i = 0; i < links.length; i++ ){
				var sheet = links[ i ],
				href = sheet.href,
				media = sheet.media,
				isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

				//only links plz and prevent re-parsing
				if( !!href && isCSS && !parsedSheets[ href ] ){
					// selectivizr exposes css through the rawCssText expando
					if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
						translate( sheet.styleSheet.rawCssText, href, media );
						parsedSheets[ href ] = true;
					} else {
						if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
							href.replace( RegExp.$1, "" ).split( "/" )[0] === w.location.host ){
							// IE7 doesn't handle urls that start with '//' for ajax request
							// manually add in the protocol
							if ( href.substring(0,2) === "//" ) { href = w.location.protocol + href; }
							requestQueue.push( {
								href: href,
								media: media
							} );
						}
					}
				}
			}
			makeRequests();
		};

	//translate CSS
	ripCSS();

	//expose update for re-running respond later on
	respond.update = ripCSS;

	//expose getEmValue
	respond.getEmValue = getEmValue;

	//adjust on resize
	function callMedia(){
		applyMedia( true );
	}

	if( w.addEventListener ){
		w.addEventListener( "resize", callMedia, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onresize", callMedia );
	}
})(this);
 
 var suggestVal = '';
var defaultCity = $('#defaultCityShowStr').val();
if (typeof defaultCity == 'undefined' || defaultCity == null || !defaultCity)
defaultCity = '城市或目的地';
defaultAbroadCity = '城市';
defaultInCity = '城市或目的地';
// 1表示国外， 0 表示国内
var abroadcitys = [];
var sugTag   = 'hotcity';
if($('#actionname').val()=='Front_Search'||$('#actionname').val()=='Front_Search_Partner'){
    if ($('#nationId').val() > 0) {
        sugTag = 'abrd';
    } else {
        var firstLetter = $('#citydomain').val().substring(0,1);
        if ('abcd'.indexOf(firstLetter) !== -1) {
            sugTag = 'a_d';
        } else if ('efghj'.indexOf(firstLetter) !== -1) {
            sugTag = 'k_n';
        } else if ('pqrstw'.indexOf(firstLetter) !== -1) {
            sugTag = 'p_w';
        } else {
            sugTag = 'x_z';
        }
    }
    var city_name = $('#searchcityd').val();
    var _keywordValue = '';
}else{
    var city_name = $('#searchcity').val();
    var _keywordValue = '无';
}
var sugTitle = 'hotcity';
var sugTmpTag = 'hotcity';
var ajaxAllCitys = {
    abroadAllCity:{},
    abroadHotCity:[],
    internalAllCity:{},
    internalHotCity:[]
};
var defaultErrorTip = '对不起，没有找到对应的城市或目的地';

(function ($) {
    var cityIdFromProp = $("#cityid").val();
    if(cityIdFromProp){
        XZWebAjax.get(XZWebUrlWriter.getCityInfo(), {cityId:cityIdFromProp}, true, getCityInfoCallback,'json');
    }
    function getCityInfoCallback(data){
        if(cityIdFromProp){
            var responseData = data.sucmsg;
            var abroadParam = responseData.abroad ;
            $("#selectcitypinyin").val(responseData.pinyin);
            $("#abroad").val(abroadParam);
            if(abroadParam == 0){
                $("#radio_inland_real").removeAttr("checked","checked").attr("checked","checked");
                $("#radio_oversaes_real").removeAttr("checked","checked");
            }else{
                $("#radio_oversaes_real").attr("checked","checked");
                $("#radio_inland_real").removeAttr("checked","checked");
            }
        }
    }
    // url, ajaxData, async, callback, dataType
	XZWebAjax.get(XZWebUrlWriter.getSearchCitysLists(), {}, true, getAllcitysCallback,'json');

    function getAllcitysCallback(data){
        ajaxAllCitys = data.sucmsg;
    }
    $.suggest = function (input, options, reset) {
        $('#suggestion_citydomain').val('');
        var $input = $(input).attr("autocomplete", "off");
        var $results;
        var timeout = false;		// hold timeout ID for suggestion results to appear
        var prevLength = 0;			// last recorded length of $input.val()
        var cache = [];				// cache MRU list
        var cacheSize = 0;			// size of cache in chars (bytes?)

        if ($(".dropDiv").is(":visible")){
            $(".dropDiv").empty().hide();
        }

        if ($.trim($input.val()) == '' && !$('#suggest').is(':visible') && !$('.sug').is(':visible')){
            $input.val(defaultCity);
        }
        if (!options.attachObject){
            options.attachObject = $(document.createElement("ul")).appendTo('body');
        }

        $results = $(options.attachObject);
        $results.addClass(options.resultsClass);

        if (reset)
        {
            resetPosition();
            $(window)
                .load(resetPosition)		// just in case user is changing size of page while loading
                .resize(resetPosition);
        }

        $input.blur(function () {
            //setTimeout(function() { $results.hide() }, 200);
            //setTimeout(function() {$('.sug').hide()}, 200);
            if($('#actionname').val()=='Front_Search'){
                $('#searchcityd').val(city_name);
            }
            setTimeout(function () {
                $('#suggest').hide();
                // $('.sug').hide()
                setDefaultCity();

            }, 200);
        });

        $input.focus(function () {
            
            
            $('#tip_searchcity').hide();
            if ($.trim($(this).val()) == defaultCity || $.trim($(this).val()) == defaultAbroadCity) {
                //$(this).val('').css('color','#000');
                if($('#abroad').val()>0){
                    $(this).val('选择城市');
                }else{
                    $(this).val('');
                }
            }
            if ($(".sug").is(":visible")){
                $(".sug").hide();
            }
            if ($.trim($(this).val()) == ''||$('#searchcity').val()) {
                $('.sug').show();
                if ($("#dropDiv").is(":visible")){
                    $("#dropDiv").empty().hide();
                }
                if($('#abroad').val()>0){
                    $('#abrd').click();
                }else{
                    $('#'+sugTag).click();
                }
                $('#suggest').html('');
                $('#suggest').hide();
                scrollPage($('.sug'));
            }
            // $('#abroad').val();
            selectShowCitys();
        });
        $input.click(function () {
            $('#tip_searchcity').hide();
            $("#keyword").val(_keywordValue);
            $("#searchkey").val("");
            $("#defaulturl").val("");
            $("#landmarklat").val("");
            $("#landmarklng").val("");
            $("#landmarkid").val("");
            $("#landmarktype").val("");
            var q = $.trim($(this).val());
            if (q == '' || q == defaultCity || q == defaultAbroadCity){
                $('.sug').show();
                if ($("#dropDiv").is(":visible")){
                    $("#dropDiv").empty().hide();
                }
                if($('#abroad').val()>0){
                    $('#abrd').click();
                }else{
                    $('#'+sugTag).click();
                }
                $('#suggest').html('');
                $('#suggest').hide();
                $(this).select();
            }else{
                if ($('.sug').is(":visible")){
                    // do nothing
                }else{
                    displayItems(q);
                }
                //$(this).select();
            }

        });
        $('#searchcityd_search').click(function(){
            selectCurrentResult();
        });

        // help IE users if possible
        /**
          try {
          $results.bgiframe();
          } catch(e) { }
         **/
        $input.keyup(processKey);//
        $input.on('input', processKey);

        function resetPosition() {
            // requires jquery.dimension plugin
            var offset = $input.offset();
            var offsetTop = offset.top + 3;
            $results.css({
                top: (offsetTop + input.offsetHeight) + 'px',
                left: offset.left + 'px'
            });
            $('.sug').css({
                top: (offsetTop + input.offsetHeight) + 'px',
                left: offset.left + 'px'
            });

        }


        function processKey(e) {
            if($('#actionname').val()=='Front_Search'||$('#actionname').val()=='Front_Search_Partner'){
                if($('#searchcityd').val()!=''&&$('#searchcityd').val()!=defaultCity){
                    $('#searchcityd_search').show();
                    $('.sug').hide();
                }else{
                    $('#searchcityd_search').hide();
                }
            }
            // handling up/down/escape requires results to be visible
            // handling enter/tab requires that AND a result to be selected
            if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
                    (/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {

                        if (e.preventDefault)
                            e.preventDefault();
                        if (e.stopPropagation)
                            e.stopPropagation();

                        e.cancelBubble = true;
                        e.returnValue = false;

                        switch (e.keyCode) {

                            case 38: // up
                                prevResult();
                                break;

                            case 40: // down
                                nextResult();
                                break;
                            case 13: // return
                                var inputValue = $('#searchcity').attr('value');
                                /*
                                   if(inputValue != ''&& inputValue != defaultCity && suggest_tip.indexOf(inputValue) < 0)
                                   {
                                   displayItems(inputValue);
                                   break;
                                   }*/
                                selectCurrentResult();
                                break;

                            case 27: //	escape
                                $results.hide();
                                break;

                        }

                    } else if ($input.val().length != prevLength) {

                        if (timeout)
                            clearTimeout(timeout);
                        timeout = setTimeout(suggest, options.delay);
                        prevLength = $input.val().length;

                    }

        }

        function selectShowCitys(){
            var selectedCityId =$('#cityid').val();
            // 1表示国外， 0 表示国内
            var selectedCityAbroad = $('#abroad').val();
            if(selectedCityId){
                // $(target).parent().addClass('lable-checked').siblings().removeClass('lable-checked');
                var currentHotCitys = [];
                if(selectedCityAbroad==0){
                    $('#radio_lable_l').addClass('lable-checked').siblings().removeClass('lable-checked');
                    currentHotCitys = ajaxAllCitys.internalHotCity;  
                }else{
                    $('#radio_lable_r').addClass('lable-checked').siblings().removeClass('lable-checked');
                    currentHotCitys = ajaxAllCitys.abroadHotCity;
                };
                var isHOtCitys = false;
                for(var i=0;i<currentHotCitys.length;i++){
                    if(currentHotCitys[i]['city_id'] == selectedCityId){
                        $('#hotcity').click();
                        isHOtCitys = true;
                        var listStr = returnHotCityList('initial');
                        pushHtmlToCitysBox(listStr);
                        break;
                    }
                }
                if(!isHOtCitys){
                    var currentCitys={};
                    //国内
                    if(selectedCityAbroad == 0){
                        currentCitys = ajaxAllCitys.internalAllCity; 
                        $("#radio_inland_real").removeAttr("checked","checked").attr("checked","checked");
                        $("#radio_oversaes_real").removeAttr("checked","checked");
                        
                        // $('#radio_lable_r').addClass('lable-checked').siblings().removeClass('lable-checked');
                    }else{
                        currentCitys = ajaxAllCitys.abroadHotCity;
                        $("#radio_oversaes_real").attr("checked","checked");
                        $("#radio_inland_real").removeAttr("checked","checked");
                        // $('#radio_lable_l').addClass('lable-checked').siblings().removeClass('lable-checked');
                    };
                    
                    // $('#selectcitydomain').val(cityDomain);
                    var cityPinyin = $('#selectcitypinyin').val();
                    var cityInitail = cityPinyin.substr(0,1);
                    var intialLetters = ['a_b_c_d','e_f_g_h_j','k_l_m_n','p_q_r_s_t_w','x_y_z'];
                    var selectedCityGroup;
                    for(var i=0;i<intialLetters.length;i++){
                        if(intialLetters[i].indexOf(cityInitail)>-1){
                            selectedCityGroup = i;
                            break;
                        }
                    };
                    var listStr = intialLetters[selectedCityGroup];
                    // pushHtmlToCitysBox(listStr);
                    var clickedId ='#'+ listStr.substring(0,1) +"_"+listStr.substring (listStr.length-1);

                    $(clickedId).click();
                }


            }else{
                var listStr = returnHotCityList();
                pushHtmlToCitysBox(listStr);
            }
            // $(this).addClass('sug-hover').siblings().removeClass('sug-hover');
            

        }

        function suggest() {
            var q = $.trim($input.val());
            if (q != '' && q != defaultCity && q != defaultAbroadCity)
            {
                $('.sug').hide();
                displayItems(q);
            } else
            {
                $('#suggest').html('');
                $('#suggest').hide();
                $('.sug').show();
                if ($("#dropDiv").is(":visible"))
                    $("#dropDiv").empty().hide();
                $('#hotcity').click();
            }
        }
        function displayItems(items) {
            if($('#abroad').val() > 0) return false;
            if (items == defaultCity || items == defaultAbroadCity)
            {
                items = '';
                $input.val('');
            }
            var html = '';
            if (items != '')
            {
                if($('#actionname').val()=='Front_Search'||$('#actionname').val()=='Front_Search_Partner'){
                    var searchcityVal = $("#searchcityd").val();
                }else{
                    var searchcityVal = $("#searchcity").val();
                }

                html = getSuggestionHtml(searchcityVal);
                // if (html == '') {
                    $('#suggestion_citydomain').attr('value', '');
                    suggest_tip = '<div class="ac_result_tip err_tip_style">' + defaultErrorTip + '</div>';
                // }
                if (html == '')
                    html = suggest_tip;
                else
                    html = '<ul>' + html + '</ul>';
            } else
            {
                html = '';
                $results.hide();
            }
            var findStr = "citySpan";
            if (html != '' && suggestVal == items && items != '' && items != defaultCity && items != defaultAbroadCity)
            {
                var li_len = eval("html.match(/" + findStr + "/ig).length");
                if (li_len == 1)
                {
                    html = '';
                    $results.hide();
                    $('.sug').show();
                    if ($("#dropDiv").is(":visible"))
                        $("#dropDiv").empty().hide();
                    $('#' + sugTitle).click();
                    $('.sug-city a').removeClass('a_over');
                    $(".sug-city a[title='" + city_name + "']").addClass('a_over');

                }
            }
            if (html != '')
            {
                $results.html(html).show();
                $results.children('ul').children('li:first-child').addClass(options.selectClass);

                $results.children('ul')
                    .children('li')
                    .mouseover(function () {
                        $results.children('ul').children('li').removeClass(options.selectClass);
                        $(this).addClass(options.selectClass);
                    })
                .click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectCurrentResult();
                });
            }
        }

        function getCurrentResult() {

            if (!$results.is(':visible'))
                return false;

            var $currentResult = $results.children('ul').children('li.' + options.selectClass);
            if (!$currentResult.length)
                $currentResult = false;

            return $currentResult;

        }

        function selectCurrentResult() {
            $currentResult = getCurrentResult();
            if ($currentResult) {

                if ($.browser.msie)
                {
                    $input.val($currentResult.children('a').children('span')[0].outerText);
                } else
                {
                    $input.val($currentResult.children('a').children('span')[0].textContent);
                }
                $results.hide();
                if ($(options.dataContainer)) {
                    $(options.dataContainer).val($currentResult.attr('rel'));
                }

                if (typeof ($.fn.autopoint) == "function") {
                    $("#keyword,#keyword_icon").autopoint({url: window.location.protocol + '//' + domain + '/ajaxRequest/Ajax_getLandMarkSuggestion', submit: ["searchbtn"]});
                }
                if (options.onSelect) {
                    options.onSelect.apply($input[0]);
                }
                city_name = $input.val();
                $('#searchcity').blur();
                $('#suggestion_citydomain').val($currentResult.attr('rel'));
                var landmarkid = $currentResult.attr('landmarkid');
                var landmarktype = $currentResult.attr('landmarktype');
                if (landmarkid == '' || !isDefined(landmarkid))
                {
                    $('#searchkey').val('');
                    $('#landmarkid').val('');
                    $('#landmarktype').val('');
                    $('#defaulturl').val('');
                } else
                {
                    $('#searchkey').val(city_name);
                    $('#landmarkid').val(landmarkid);
                    $('#landmarktype').val(landmarktype);
                    $('#defaulturl').val(city_name + '_' + parseInt(landmarkid).toString(36) + landmarktype);
                }

                if($('#actionname').val()=='Front_Search'||$('#actionname').val()=='Front_Search_Partner'){
                    setTimeout(function() {
                        searchCity('home');
                    }, 1);
                }

            }

        }
        function getFirstValue()
        {
            var firstValue = '';
            if (!$results.is(':visible'))
                return false;
            var $suggestResult = $results.children('ul').children('li');
            if (!$suggestResult.length)
                $currentResult = false;
            else
            {
                if ($.browser.msie)
                {
                    firstValue = $suggestResult.eq(0).children('a').children('span')[0].outerText;

                } else
                {
                    firstValue = $suggestResult.eq(0).children('a').children('span')[0].textContent;
                }
            }
            return firstValue;
        }
        function nextResult() {

            $currentResult = getCurrentResult();

            var searchcityVal = $("#searchcity").val();
            $("#searchcity").val('').val(searchcityVal);
            if ($currentResult)
                $currentResult
                    .removeClass(options.selectClass)
                    .next()
                    .addClass(options.selectClass);
            else
                $results.children('ul').children('li:first-child').addClass(options.selectClass);

        }

        function prevResult() {

            $currentResult = getCurrentResult();

            var searchcityVal = $("#searchcity").val();
            $("#searchcity").val('').val(searchcityVal);
            if ($currentResult)
                $currentResult
                    .removeClass(options.selectClass)
                    .prev()
                    .addClass(options.selectClass);
            else
                $results.children('ul').children('li:last-child').addClass(options.selectClass);

        }

    }

    $.fn.suggest = function (source, options, reset) {

        if (!source)
            return;

        options = options || {};
        options.source = source;
        options.delay = options.delay || 0;
        options.resultsClass = options.resultsClass || 'ac_results2';
        options.selectClass = options.selectClass || 'ac_over';
        options.matchClass = options.matchClass || 'ac_match';
        options.minchars = options.minchars || 1;
        options.delimiter = options.delimiter || '\n';
        options.onSelect = options.onSelect || false;
        options.dataDelimiter = options.dataDelimiter || '\t';
        options.dataContainer = options.dataContainer || '#SuggestResult';
        options.attachObject = options.attachObject || null;

        this.each(function () {
            new $.suggest(this, options, reset);
        });

        return this;

    };

})(jQuery);

$('#suggest_icon').click(function () {
    if ($(this).hasClass('list_arrow_down') || $(this).hasClass('tenant_need_city')) {
        if ($('.sug').is(':visible'))
{
    $('.sug').hide();
}
else
{
    $('.sug').click();
    $('#hotcity').click();
    $('.sug').show();
}
$('#searchcity').click();
$('#searchcity').blur();
}
else
{
    if ($('.sug').is(':visible'))
{
    $('.sug').hide();
}
else if ($('#suggest').is(':visible'))
{
    $('#suggest').hide();
}
else
{
    $('#searchcity').focus();
    $('#searchcity').click();
    $(this).blur();
}
}
});

$('#radio_form').click(function(e){
    var target = e.target ;
    if(target.nodeName.toLowerCase() == 'span'||target.nodeName.toLowerCase() == 'input'){
        var eleValue = $(target).attr('value');
        // eleValue=="abrd"?$('#abroad').val(1):$('#abroad').val(0);
        $(':radio[value='+eleValue+']').prop('checked',true);
        $(target).parent().addClass('lable-checked').siblings().removeClass('lable-checked');
        $('#hotcity').click();
        var listStr = returnHotCityList();
        pushHtmlToCitysBox(listStr);
    }
});

function setDefaultCity()
{
    if($('#actionname').val()=='Front_Search'||$('#actionname').val()=='Front_Search_Partner'){
        if ($('#searchcityd').val()== '' && !$('#suggest').is(':visible') && !$('.sug').is(':visible'))
        {
            $('#searchcityd').val(defaultCity);
        }
    }else{
        if ($('#searchcity').attr('value') == '' && !$('#suggest').is(':visible') && !$('.sug').is(':visible'))
        {
            $('#searchcity').attr('value', defaultCity);
            if($('#abroad')>0){
               $('#searchcity').val(defaultAbroadCity);
            }
        }
    }
}
function returnCommonStr(param){
    var cityStr = param['short_name'] + '" href="javascript:getSelectedCity(\'' 
    + param['short_name'] + '\',\'' + param['domain'] + '\',\'' + param['landmarkId'] 
    + '\',\'' + param['landmarkType'] + '\',\'' + param['city_id'] + '\',\''
    + param['timezone']+ '\',\''+ param['isAbroad'] + '\',\'' + param['pinyin'] +'\')">' + param['short_name'] + '</a></span>'
    return cityStr;
}
function returnCityList(spellings){
    var overseasOrInland = $("input[name='overseas-inland']:checked").val();
    var nowCitys = overseasOrInland =='inland'?ajaxAllCitys.internalAllCity:ajaxAllCitys.abroadAllCity;
    // var nowCitys = $("#abroad").val()==0?ajaxAllCitys.internalAllCity:ajaxAllCitys.abroadAllCity;
    var listStr = '';
    var spanClass = "";
    var spellArr = spellings.split('_'); 
    for (var m = 0; m < spellArr.length; m++){
        let groupCitysList = '';
        var initalCitys = nowCitys[spellArr[m].toUpperCase()];
        if(!initalCitys){
            continue;
        }
        for (var n = 0; n < initalCitys.length; n++){
            if (initalCitys[n]['short_name'] == city_name){
                if (spanClass == ""){
                    groupCitysList += '<span><a class="a_over" title="' + returnCommonStr(initalCitys[n]);
                }else{
                    groupCitysList += '<span class="' + spanClass + '"><a class="a_over" title="'+  returnCommonStr(initalCitys[n]);
                }
            }else{
                if (spanClass == ""){
                    groupCitysList += '<span><a title="' +  returnCommonStr(initalCitys[n]);
                } else{
                    groupCitysList += '<span class="' + spanClass + '"><a title="' +  returnCommonStr(initalCitys[n]);
                }
            }
        }
        if(groupCitysList.length>0){
            groupCitysList = '<div class="group-city"><label class="initial">'+ spellArr[m].toUpperCase() +'</label>'+groupCitysList +'</div>'
        }
        listStr += groupCitysList ;
    }
    listStr = '<div class="citys-box">'+listStr+'</div>' ;
    return listStr;
}
// overseas suggest
function returnHotCitysDom(hotCitys){
    // var overseasOrInland = $("input[name='overseas-domestic']:checked").val();
    // var nowHotCity ;
    // overseasOrInland =='inland'?nowHotCity = ajaxAllCitys.internalHotCity:nowHotCity = ajaxAllCitys.abroadHotCity;
    var spanClass = '';
    var listStr='';
    abroadcitys.length > 0?listStr += '<div class="b_border clearfix">':listStr += '<div class="clearfix">';
    for (var m = 0; m < hotCitys.length; m++){
        if (hotCitys[m].short_name == city_name){
            if (spanClass == ""){
                listStr += '<span><a class="a_over" title="' + returnCommonStr(hotCitys[m])
            } else{
                listStr += '<span class="' + spanClass + '"><a class="a_over" title="'+ returnCommonStr(hotCitys[m])
            }
        } else{
            if (spanClass == ""){
                listStr += '<span><a title="' + returnCommonStr(hotCitys[m])
            } else{
                listStr += '<span class="' + spanClass + '"><a title="' + returnCommonStr(hotCitys[m])
            }
        }
    }
    listStr += '</div>';
    return listStr;
}
function pushHtmlToCitysBox(listStr){
    $('#con_one_1').html(listStr);
    scrollPage($('.sug'));
}
//new suggest
$('.sug-tit span').each(function (){
    if($('#actionname').val()=='Front_Search'||$('#actionname').val()=='Front_Search_Partner'){
        city_name = $('#searchcityd').val();
    }else{
        city_name = $('#searchcity').val();
    }
    
    $(this).click(function () {
        $(this).addClass('sug-hover').siblings().removeClass('sug-hover');
        // setInputCitysGroupActive();
        var spellings = $(this).attr('value');
        var listStr = spellings=='hotcity'?returnHotCityList(): returnCityList(spellings);
        pushHtmlToCitysBox(listStr);
    })
})
function setInputCitysGroupActive(){
    var inputSearchCity = $('#searchcity').val();
    // $('#suggestion_citydomain').val(cityDomain);
    // $('#selectcitydomain').val(cityDomain);
    var inputCityid = $('#cityid').val();
    // $('#timeZone').val(timeZone);
}
function returnHotCityList(initial){
    var overseasOrInland = $('#abroad').val();
    if(initial && initial=='initial'){
        var overseasOrInland = $('#abroad').val();
    }else{
        var val=$('input:radio[name="overseas-inland"]:checked').val();
        val=="abrd"?overseasOrInland = '1':overseasOrInland = '0'
    }
    // $('#abroad').val()>0
    var nowHotCity ;
    overseasOrInland ==0 ?nowHotCity = ajaxAllCitys.internalHotCity:nowHotCity = ajaxAllCitys.abroadHotCity;
    var listStr = returnHotCitysDom(nowHotCity);
    return listStr;
    // pushHtmlToCitysBox(listStr);
}


var op = $('#actionname').val();
function getSelectedCity(cityName, cityDomain, landmarkid, landmarkType, cityId, timeZone,isAbroad,pinyin)
{
    if (op == "Front_Search"||op=='Front_Search_Partner') {
        window.location = window.location.protocol + '//' + cityDomain + '.' + topLevelDomain;
    } else {
        if(timeZone && $('#abroad').val() == '0'){
            $('.nation_name').eq(1).click();
        }else if(!timeZone && $('#abroad').val() == '1'){
            $('.nation_name').eq(0).click();
        }else{
        }
        if(timeZone!="+08:00" && $('#searchcity').val() != cityName){
            var newDate = new execCalendar('#startenddate',{abroad:true,cityName:cityName,timeZone:timeZone});
        }else{
            var newDate = new execCalendar('#startenddate',{abroad:false,cityName:cityName,timeZone:timeZone});
        }
        $('#searchcity').val(cityName);
        $('#suggestion_citydomain').val(cityDomain);
        $('#selectcitydomain').val(cityDomain);
        $('#selectcitypinyin').val(pinyin);
        $('#cityid').val(cityId);
        $('#timeZone').val(timeZone);
        $('#abroad').val(isAbroad);
       sugTag = sugTmpTag;

        if (landmarkid == '')
        {
            $('#searchkey').val('');
            $('#landmarkid').val('');
            $('#defaulturl').val('');
        } else
        {
            $('#searchkey').val(cityName);
            $('#landmarkid').val(landmarkid);
            $('#defaulturl').val(cityName + '_' + parseInt(landmarkid).toString(36) + landmarkType);
        }
        if (typeof ($.fn.autopoint) == "function") {
            $("#keyword,#keyword_icon").autopoint({url: window.location.protocol + '//' + domain + '/ajaxRequest/Ajax_getLandMarkSuggestion', submit: ["searchbtn"]});
        }
        city_name = $('#searchcity').val();
        $('.sug').hide();
    }
}
$('#close_new').click(function () {
    $('.sug').hide();
    if ($('#searchcity').val() == '' && !$('.suggest').is(':visible'))
    {
        $('#searchcity').val(defaultCity);
    }
})

function getSuggestionHtml(word)
{
    var cityAjaxUrl = window.location.protocol + '//' + domain + '/ajaxRequest/Ajax_getCityLandMarkSuggestion';
    var cityId = '';
    var returnMsg = '';
    try {
        var rand = Math.floor(Math.random() * 10000);
        var params = "jsoncallback=?&searchKey=" + encodeURIComponent(word) + "&_t=" + rand;
        if (isDefined(cityId))
            params += "&cityId=" + cityId;
        $.ajaxSettings.async = false;
        $.getJSON(cityAjaxUrl, params, function (msg) {
            if ('' + msg.data != 'null')
            returnMsg = '' + msg.data;
            else
            return '';
        });
    } catch (err)
    {
    }
    return returnMsg;
}
 
 var hotcitys=new Array();

hotcitys[0]=new Array('bj','北京','beijing','bj','21125','beijing','北京','','',12,0);

hotcitys[1]=new Array('sh','上海','shanghai','sh','19549','shanghai','上海','','',13,0);

hotcitys[3]=new Array('gz','广州','guangzhou','gz','12579','guangdong','广东','','',16,0);

hotcitys[2]=new Array('cd','成都','chengdu','cd','20230','sichuan','四川','','',45,0);

hotcitys[4]=new Array('sz','深圳','shenzhen','sz','9223','guangdong','广东','','',17,0);

hotcitys[8]=new Array('xa','西安','xian','xa','15257','shanxi','陕西','','',176,0);

hotcitys[15]=new Array('nj','南京','nanjing','nj','7387','jiangsu','江苏','','',65,0);

hotcitys[9]=new Array('hz','杭州','hangzhou','hz','10005','zhejiang','浙江','','',26,0);

hotcitys[7]=new Array('cq','重庆','chongqing','cq','16363','chongqing','重庆','','',15,0);

hotcitys[12]=new Array('wh','武汉','wuhan','wh','9998','hubei','湖北','','',194,0);

hotcitys[16]=new Array('sz','苏州','suzhou','su','6705','jiangsu','江苏','','',67,0);

hotcitys[18]=new Array('qd','青岛','qingdao','qd','13270','shandong','山东','','',114,0);

hotcitys[11]=new Array('xm','厦门','xiamen','xm','7532','fujian','福建','','',76,0);

hotcitys[6]=new Array('sy','三亚','sanya','sanya','8123','hainan','海南','','',144,0);

hotcitys[10]=new Array('heb','哈尔滨','haerbin','hrb','4620','heilongjiang','黑龙江','','',93,0);

hotcitys[14]=new Array('tj','天津','tianjin','tj','4113','tianjin','天津','','',14,0);

hotcitys[17]=new Array('km','昆明','kunming','km','4537','yunnan','云南','','',225,0);

hotcitys[5]=new Array('xg','香港','xianggang','hongkong','2507','xianggang','香港','','',344,0);

hotcitys[13]=new Array('cs','长沙','changsha','cs','6348','hunan','湖南','','',204,0);

var abroadhotcitys=new Array();

abroadhotcitys[0]=new Array('tokyo','东京','tokyo','tokyo','0','','','','',1190,'1','+09:00');

abroadhotcitys[1]=new Array('osaka','大阪','osakaw','osaka','0','','','','',1191,'1','+09:00');

abroadhotcitys[2]=new Array('kyoto','京都','kyoto','kyoto','0','','','','',1196,'1','+09:00');

abroadhotcitys[3]=new Array('bangkok','曼谷','mangu','bangkok','0','','','','',2153,'1','+07:00');

abroadhotcitys[4]=new Array('phuket','普吉岛','phuket','phuket','0','','','','',2155,'1','+07:00');

abroadhotcitys[5]=new Array('chiangmai','清迈','chiangmai','chiangmai','0','','','','',2154,'1','+07:00');

abroadhotcitys[6]=new Array('pattaya','芭堤雅','badiya','pattaya','0','','','','',2157,'1','+07:00');

abroadhotcitys[7]=new Array('kohsamui','苏梅岛','kohsamui','kohsamui','0','','','','',2156,'1','+07:00');

abroadhotcitys[8]=new Array('seoul','首尔','seoul','seoul','0','','','','',1288,'1','+09:00');

abroadhotcitys[9]=new Array('jejuisland','济州岛','jejuisland','jejuisland','0','','','','',1297,'1','+09:00');

abroadhotcitys[10]=new Array('busan','釜山','pusan','busan','0','','','','',1289,'1','+09:00');

abroadhotcitys[11]=new Array('balidao','巴厘岛','balidao','balidao','0','','','','',1125,'1','+07:00');

abroadhotcitys[12]=new Array('melbourne','墨尔本','moerben','melbourne','0','','','','',550,'1','+10:00');

abroadhotcitys[13]=new Array('sydney','悉尼','xini','sydney','0','','','','',560,'1','+10:00');

abroadhotcitys[14]=new Array('losangeles','洛杉矶','losangeles','losangeles','0','','','','',2361,'1','-08:00');

abroadhotcitys[15]=new Array('kualalumpu','吉隆坡','jilongpo','kualalumpu','0','','','','',1526,'1','+08:00');

abroadhotcitys[16]=new Array('gedajinabalu','亚庇','gedajinabalu','gedajinabalu','0','','','','',1575,'1','+08:00');

abroadhotcitys[17]=new Array('singapore','新加坡','singapore','singapore','0','','','','',2004,'1','+08:00');

abroadhotcitys[18]=new Array('auckland','奥克兰','aokelan','auckland','0','','','','',1743,'1','+12:00');

abroadhotcitys[19]=new Array('paris','巴黎','bali','paris','0','','','','',856,'1','+01:00');

var citys=new Array();

citys[0]=new Array('bj','北京','beijing','bj','21125','beijing','北京','','',12,0);

citys[1]=new Array('sh','上海','shanghai','sh','19549','shanghai','上海','','',13,0);

citys[2]=new Array('gz','广州','guangzhou','gz','12579','guangdong','广东','','',16,0);

citys[3]=new Array('cd','成都','chengdu','cd','20230','sichuan','四川','','',45,0);

citys[4]=new Array('sz','深圳','shenzhen','sz','9223','guangdong','广东','','',17,0);

citys[5]=new Array('xa','西安','xian','xa','15257','shanxi','陕西','','',176,0);

citys[6]=new Array('nj','南京','nanjing','nj','7387','jiangsu','江苏','','',65,0);

citys[7]=new Array('hz','杭州','hangzhou','hz','10005','zhejiang','浙江','','',26,0);

citys[8]=new Array('cq','重庆','chongqing','cq','16363','chongqing','重庆','','',15,0);

citys[9]=new Array('wh','武汉','wuhan','wh','9998','hubei','湖北','','',194,0);

citys[10]=new Array('sz','苏州','suzhou','su','6705','jiangsu','江苏','','',67,0);

citys[11]=new Array('wx','无锡','wuxi','wx','2232','jiangsu','江苏','','',66,0);

citys[12]=new Array('qd','青岛','qingdao','qd','13270','shandong','山东','','',114,0);

citys[13]=new Array('xm','厦门','xiamen','xm','7532','fujian','福建','','',76,0);

citys[14]=new Array('sy','三亚','sanya','sanya','8123','hainan','海南','','',144,0);

citys[15]=new Array('dl','大连','dalian','dl','5041','liaoning','辽宁','','',56,0);

citys[16]=new Array('heb','哈尔滨','haerbin','hrb','4620','heilongjiang','黑龙江','','',93,0);

citys[17]=new Array('qhd','秦皇岛','qinhuangdao','qinhuangdao','7412','hebei','河北','','',3,0);

citys[18]=new Array('tj','天津','tianjin','tj','4113','tianjin','天津','','',14,0);

citys[19]=new Array('km','昆明','kunming','km','4537','yunnan','云南','','',225,0);

citys[20]=new Array('xg','香港','xianggang','hongkong','2507','xianggang','香港','','',344,0);

citys[21]=new Array('cc','长春','changchun','cc','1882','jilin','吉林','','',84,0);

citys[22]=new Array('sy','沈阳','shenyang','sy','3659','liaoning','辽宁','','',55,0);

citys[23]=new Array('hf','合肥','hefei','hf','1818','anhui','安徽','','',123,0);

citys[24]=new Array('zz','郑州','zhengzhou','zz','2884','henan','河南','','',103,0);

citys[25]=new Array('ty','太原','taiyuan','ty','1932','shanxi','山西','','',155,0);

citys[26]=new Array('wh','威海','weihai','wei','4454','shandong','山东','','',120,0);

citys[27]=new Array('lj','丽江','lijiang','lijiang','3431','yunnan','云南','','',230,0);

citys[28]=new Array('dl','大理','dali','dali','5779','yunnan','云南','','',237,0);

citys[29]=new Array('gl','桂林','guilin','gl','3183','guangxi','广西','','',134,0);

citys[30]=new Array('am','澳门','aomen','macao','464','aomen','澳门','','',345,0);

citys[31]=new Array('fz','福州','fuzhou','fz','2323','fujian','福建','','',75,0);

citys[32]=new Array('nb','宁波','ningbo','nb','2467','zhejiang','浙江','','',27,0);

citys[33]=new Array('zh','珠海','zhuhai','zhuhai','1996','guangdong','广东','','',18,0);

citys[34]=new Array('cs','长沙','changsha','cs','6348','hunan','湖南','','',204,0);

citys[35]=new Array('sjz','石家庄','shijiazhuang','sjz','2001','hebei','河北','','',1,0);

citys[36]=new Array('ls','拉萨','lasa','ls','370','xicang','西藏','','',256,0);

citys[37]=new Array('cz','常州','changzhou','changzhou','959','jiangsu','江苏','','',69,0);

citys[38]=new Array('yz','扬州','yangzhou','yangzhou','1471','jiangsu','江苏','','',74,0);

citys[39]=new Array('dg','东莞','dongguan','dg','799','guangdong','广东','','',24,0);

citys[40]=new Array('hk','海口','haikou','hn','2201','hainan','海南','','',143,0);

citys[41]=new Array('lz','兰州','lanzhou','lz','1544','gansu','甘肃','','',166,0);

citys[42]=new Array('ly','洛阳','luoyang','luoyang','1572','henan','河南','','',104,0);

citys[43]=new Array('wlmq','乌鲁木齐','wulumuqi','xj','192','xinjiang','新疆','','',241,0);

citys[44]=new Array('xz','徐州','xuzhou','xuzhou','730','jiangsu','江苏','','',68,0);

citys[45]=new Array('gy','贵阳','guiyang','gy','2491','guizhou','贵州','','',36,0);

citys[46]=new Array('hhht','呼和浩特','huhehaote','nmg','820','neimenggu','内蒙古','','',145,0);

citys[47]=new Array('jn','济南','jinan','jn','2176','shandong','山东','','',113,0);

citys[48]=new Array('ts','唐山','tangshan','tangshan','1147','hebei','河北','','',2,0);

citys[49]=new Array('bd','保定','baoding','baoding','1072','hebei','河北','','',6,0);

citys[50]=new Array('nc','南昌','nanchang','nc','1708','jiangxi','江西','','',214,0);

citys[51]=new Array('hd','邯郸','handan','handan','327','hebei','河北','','',4,0);

citys[52]=new Array('nn','南宁','nanning','nn','2087','guangxi','广西','','',142,0);

citys[53]=new Array('wf','潍坊','weifang','weifang','610','shandong','山东','','',119,0);

citys[54]=new Array('jz','锦州','jinzhou','jinzhou','449','liaoning','辽宁','','',60,0);

citys[55]=new Array('rz','日照','rizhao','rizhao','2325','shandong','山东','','',306,0);

citys[56]=new Array('ly','临沂','linyi','linyi','309','shandong','山东','','',307,0);

citys[57]=new Array('as','鞍山','anshan','anshan','158','liaoning','辽宁','','',57,0);

citys[58]=new Array('lf','廊坊','langfang','langfang','1117','hebei','河北','','',10,0);

citys[59]=new Array('dq','大庆','daqing','daqing','290','heilongjiang','黑龙江','','',98,0);

citys[60]=new Array('bh','北海','beihai','beihai','4713','guangxi','广西','','',317,0);

citys[61]=new Array('zs','中山','zhongshan','zhongshan','502','guangdong','广东','','',25,0);

citys[62]=new Array('xn','西宁','xining','xn','1343','qinghai','青海','','',186,0);

citys[63]=new Array('jh','金华','jinhua','jinhua','936','zhejiang','浙江','','',32,0);

citys[64]=new Array('dd','丹东','dandong','dandong','1293','liaoning','辽宁','','',59,0);

citys[65]=new Array('cd','承德','chengde','chengde','2940','hebei','河北','','',8,0);

citys[66]=new Array('pj','盘锦','panjin','panjin','412','liaoning','辽宁','','',63,0);

citys[67]=new Array('zb','淄博','zibo','zibo','371','shandong','山东','','',115,0);

citys[68]=new Array('zz','株洲','zhuzhou','zhuzhou','316','hunan','湖南','','',205,0);

citys[69]=new Array('fs','佛山','foshan','foshan','1507','guangdong','广东','','',20,0);

citys[70]=new Array('jl','吉林','jilinshi','jilin','529','jilin','吉林','','',85,0);

citys[71]=new Array('yl','玉林','yulin','gxyulin','31','guangxi','广西','','',138,0);

citys[72]=new Array('xt','邢台','xingtai','xingtai','209','hebei','河北','','',5,0);

citys[73]=new Array('qqhe','齐齐哈尔','qiqihaer','qiqihaer','213','heilongjiang','黑龙江','','',94,0);

citys[74]=new Array('yc','宜昌','yichang','yichang','839','hubei','湖北','','',199,0);

citys[75]=new Array('dt','大同','datong','datong','842','shanxi','山西','','',156,0);

citys[76]=new Array('yt','烟台','yantai','yantai','4696','shandong','山东','','',118,0);

citys[77]=new Array('yc','银川','yinchuan','yc','464','ningxia','宁夏','','',165,0);

citys[78]=new Array('wz','温州','wenzhou','wenzhou','1230','zhejiang','浙江','','',28,0);

citys[79]=new Array('ha','淮安','huaian','huaian','167','jiangsu','江苏','','',72,0);

citys[80]=new Array('my','绵阳','mianyang','mianyang','549','sichuan','四川','','',49,0);

citys[81]=new Array('bt','包头','baotou','baotou','345','neimenggu','内蒙古','','',146,0);

citys[82]=new Array('fs','抚顺','fushun','fushun','127','liaoning','辽宁','','',58,0);

citys[83]=new Array('ta','泰安','taian','taian','732','shandong','山东','','',305,0);

citys[84]=new Array('jn','济宁','jining','jining','368','shandong','山东','','',304,0);

citys[85]=new Array('lyg','连云港','lianyungang','lianyungang','585','jiangsu','江苏','','',71,0);

citys[86]=new Array('hnz','海南州','hainan','hainanzhou','57','qinghai','青海','','',190,0);

citys[87]=new Array('qz','泉州','quanzhou','quanzhou','1110','fujian','福建','','',79,0);

citys[88]=new Array('ay','安阳','anyang','anyang','127','henan','河南','','',109,0);

citys[89]=new Array('hz','惠州','huizhou','huizhou','7015','guangdong','广东','','',23,0);

citys[90]=new Array('hld','葫芦岛','huludao','huludao','3888','liaoning','辽宁','','',64,0);

citys[91]=new Array('jx','嘉兴','jiaxing','jiaxing','2630','zhejiang','浙江','','',29,0);

citys[92]=new Array('nt','南通','nantong','nantong','746','jiangsu','江苏','','',70,0);

citys[93]=new Array('pzh','攀枝花','panzhihua','panzhihua','189','sichuan','四川','','',274,0);

citys[94]=new Array('lz','柳州','liuzhou','liuzhou','365','guangxi','广西','','',133,0);

citys[95]=new Array('dy','东营','dongying','dongying','37','shandong','山东','','',117,0);

citys[96]=new Array('jms','佳木斯','jiamusi','jiamusi','195','heilongjiang','黑龙江','','',100,0);

citys[97]=new Array('tl','通辽','tongliao','tongliao','77','neimenggu','内蒙古','','',149,0);

citys[98]=new Array('dz','德州','dezhou','dezhou','324','shandong','山东','','',308,0);

citys[99]=new Array('gz','赣州','ganzhou','ganzhou','225','jiangxi','江西','','',220,0);

citys[100]=new Array('bz','滨州','binzhou','binzhou','64','shandong','山东','','',122,0);

citys[101]=new Array('xy','咸阳','xianyang','xianyang','406','shanxi','陕西','','',179,0);

citys[102]=new Array('jm','江门','jiangmen','jiangmen','315','guangdong','广东','','',21,0);

citys[103]=new Array('zz','漳州','zhangzhou','zhangzhou','1861','fujian','福建','','',80,0);

citys[104]=new Array('xx','新乡','xinxiang','xinxiang','244','henan','河南','','',108,0);

citys[105]=new Array('xy','襄阳','xiangyang','xiangyang','189','hubei','湖北','','',196,0);

citys[106]=new Array('nc','南充','nanchong','nanchong','421','sichuan','四川','','',51,0);

citys[107]=new Array('lc','聊城','liaocheng','liaocheng','225','shandong','山东','','',309,0);

citys[108]=new Array('zjk','张家口','zhangjiakou','zhangjiakou','1190','hebei','河北','','',7,0);

citys[109]=new Array('cz','沧州','cangzhou','cangzhou','189','hebei','河北','','',9,0);

citys[110]=new Array('shz','石河子','shihezi','shihezi','29','xinjiang','新疆','','',255,0);

citys[111]=new Array('bj','宝鸡','baoji','baoji','119','shanxi','陕西','','',178,0);

citys[112]=new Array('cf','赤峰','chifeng','chifeng','265','neimenggu','内蒙古','','',148,0);

citys[113]=new Array('zj','湛江','zhanjiang','zhanjiang','447','guangdong','广东','','',264,0);

citys[114]=new Array('sq','商丘','shangqiu','shangqiu','120','henan','河南','','',297,0);

citys[115]=new Array('pds','平顶山','pingdingshan','pingdingshan','53','henan','河南','','',105,0);

citys[116]=new Array('xy','信阳','xinyang','xinyang','69','henan','河南','','',298,0);

citys[117]=new Array('jj','九江','jiujiang','jiujiang','498','jiangxi','江西','','',217,0);

citys[118]=new Array('yk','营口','yingkou','yingkou','3031','liaoning','辽宁','','',61,0);

citys[119]=new Array('bx','本溪','benxi','benxi','346','liaoning','辽宁','','',286,0);

citys[120]=new Array('ly','辽阳','liaoyang','liaoyang','16','liaoning','辽宁','','',62,0);

citys[121]=new Array('qz','钦州','qinzhou','qinzhou','25','guangxi','广西','','',136,0);

citys[122]=new Array('hy','衡阳','hengyang','hengyang','441','hunan','湖南','','',207,0);

citys[123]=new Array('st','汕头','shantou','shantou','996','guangdong','广东','','',19,0);

citys[124]=new Array('wh','芜湖','wuhu','wuhu','323','anhui','安徽','','',124,0);

citys[125]=new Array('hlbe','呼伦贝尔','hulunbeier','hulunbeier','836','neimenggu','内蒙古','','',151,0);

citys[126]=new Array('xt','湘潭','xiangtan','xiangtan','146','hunan','湖南','','',206,0);

citys[127]=new Array('cys','朝阳市','chaoyang','chaoyang','31','liaoning','辽宁','','',289,0);

citys[128]=new Array('qy','清远','qingyuan','qingyuan','1625','guangdong','广东','','',270,0);

citys[129]=new Array('sn','遂宁','suining','suining','75','sichuan','四川','','',276,0);

citys[130]=new Array('tz','泰州','taizhoujs','jstaizhou','111','jiangsu','江苏','','',291,0);

citys[131]=new Array('pt','莆田','putian','putian','161','fujian','福建','','',77,0);

citys[132]=new Array('zz','枣庄','zaozhuang','zaozhuang','596','shandong','山东','','',116,0);

citys[133]=new Array('lz','泸州','luzhou','luzhou','199','sichuan','四川','','',47,0);

citys[134]=new Array('zs','舟山','zhoushan','zhoushan','3111','zhejiang','浙江','','',34,0);

citys[135]=new Array('zj','镇江','zhenjiang','zhenjiang','317','jiangsu','江苏','','',290,0);

citys[136]=new Array('kf','开封','kaifeng','kaifeng','974','henan','河南','','',293,0);

citys[137]=new Array('eeds','鄂尔多斯','eerduosi','eerduosi','126','neimenggu','内蒙古','','',150,0);

citys[138]=new Array('sy','十堰','shiyan','shiyan','146','hubei','湖北','','',197,0);

citys[139]=new Array('yb','延边','yanbian','yanbian','836','jilin','吉林','','',92,0);

citys[140]=new Array('hb','淮北','huaibei','huaibei','62','anhui','安徽','','',311,0);

citys[141]=new Array('lf','临汾','linfen','linfen','243','shanxi','山西','','',164,0);

citys[142]=new Array('cd','常德','changde','changde','168','hunan','湖南','','',210,0);

citys[143]=new Array('jz','荆州','jingzhou','jingzhou','151','hubei','湖北','','',198,0);

citys[144]=new Array('cz','郴州','chenzhou','chenzhou','858','hunan','湖南','','',211,0);

citys[145]=new Array('dy','德阳','deyang','deyang','208','sichuan','四川','','',48,0);

citys[146]=new Array('sx','绍兴','shaoxing','shaoxing','558','zhejiang','浙江','','',31,0);

citys[147]=new Array('ny','南阳','nanyang','nanyang','195','henan','河南','','',111,0);

citys[148]=new Array('hz','菏泽','heze','heze','119','shandong','山东','','',338,0);

citys[149]=new Array('tz','台州','taizhouzj','taizhouzj','850','zhejiang','浙江','','',35,0);

citys[150]=new Array('zy','遵义','zunyi','zunyi','335','guizhou','贵州','','',38,0);

citys[151]=new Array('fx','阜新','fuxin','fuxin','27','liaoning','辽宁','','',287,0);

citys[152]=new Array('yc','盐城','yancheng','yancheng','99','jiangsu','江苏','','',73,0);

citys[153]=new Array('xq','宿迁','suqian','suqian','59','jiangsu','江苏','','',292,0);

citys[154]=new Array('jz','焦作','jiaozuo','jiaozuo','152','henan','河南','','',106,0);

citys[155]=new Array('cz','长治','changzhi','changzhi','151','shanxi','山西','','',158,0);

citys[156]=new Array('ja','吉安','jian','jian','204','jiangxi','江西','','',221,0);

citys[157]=new Array('dz','达州','dazhou','dazhou','80','sichuan','四川','','',53,0);

citys[158]=new Array('lh','漯河','luohe','luohe','5','henan','河南','','',110,0);

citys[159]=new Array('zmd','驻马店','zhumadian','zhumadian','52','henan','河南','','',300,0);

citys[160]=new Array('hz','汉中','hanzhong','hanzhong','144','shanxi','陕西','','',182,0);

citys[161]=new Array('hy','河源','heyuan','heyuan','167','guangdong','广东','','',268,0);

citys[162]=new Array('tl','铁岭','tieling','tieling','22','liaoning','辽宁','','',288,0);

citys[163]=new Array('jz','晋中','jinzhong','jinzhong','1249','shanxi','山西','','',161,0);

citys[164]=new Array('ak','安康','ankang','ankang','41','shanxi','陕西','','',184,0);

citys[165]=new Array('xg','孝感','xiaogan','xiaogan','30','hubei','湖北','','',327,0);

citys[166]=new Array('yy','岳阳','yueyang','yueyang','214','hunan','湖南','','',209,0);

citys[167]=new Array('zq','肇庆','zhaoqing','zhaoqing','301','guangdong','广东','','',265,0);

citys[168]=new Array('hs','衡水','hengshui','hengshui','458','hebei','河北','','',11,0);

citys[169]=new Array('mdj','牡丹江','mudanjiang','mudanjiang','240','heilongjiang','黑龙江','','',302,0);

citys[170]=new Array('aq','安庆','anqing','anqing','65','anhui','安徽','','',127,0);

citys[171]=new Array('hg','黄冈','huanggang','huanggang','71','hubei','湖北','','',328,0);

citys[172]=new Array('ld','娄底','loudi','loudi','32','hunan','湖南','','',213,0);

citys[173]=new Array('ls','乐山','leshan','leshan','1735','sichuan','四川','','',50,0);

citys[174]=new Array('sp','四平','siping','siping','150','jilin','吉林','','',86,0);

citys[175]=new Array('bb','蚌埠','bengbu','bengbu','103','anhui','安徽','','',125,0);

citys[176]=new Array('cj','昌吉','changji','changji','4','xinjiang','新疆','','',250,0);

citys[177]=new Array('sg','韶关','shaoguan','shaoguan','316','guangdong','广东','','',263,0);

citys[178]=new Array('yj','阳江','yangjiang','yangjiang','1634','guangdong','广东','','',269,0);

citys[179]=new Array('cz','潮州','chaozhou','chaozhou','400','guangdong','广东','','',271,0);

citys[180]=new Array('zjj','张家界','zhangjiajie','zhangjiajie','1457','hunan','湖南','','',334,0);

citys[181]=new Array('hh','怀化','huaihua','huaihua','68','hunan','湖南','','',336,0);

citys[182]=new Array('xsbn','西双版纳','xishuangbanna','xishuangbanna','1639','yunnan','云南','','',235,0);

citys[183]=new Array('sm','三明','sanming','sanming','80','fujian','福建','','',78,0);

citys[184]=new Array('hn','淮南','huainan','huainan','83','anhui','安徽','','',310,0);

citys[185]=new Array('yc','运城','yuncheng','yuncheng','138','shanxi','山西','','',162,0);

citys[186]=new Array('ms','眉山','meishan','meishan','232','sichuan','四川','','',279,0);

citys[187]=new Array('xc','许昌','xuchang','xuchang','55','henan','河南','','',295,0);

citys[188]=new Array('sh','绥化','suihua','suihua','33','heilongjiang','黑龙江','','',102,0);

citys[189]=new Array('fcg','防城港','fangchenggang','fangchenggang','649','guangxi','广西','','',318,0);

citys[190]=new Array('yz','永州','yongzhou','yongzhou','43','hunan','湖南','','',212,0);

citys[191]=new Array('yy','益阳','yiyang','yiyang','17','hunan','湖南','','',335,0);

citys[192]=new Array('sr','上饶','shangrao','shangrao','1034','jiangxi','江西','','',224,0);

citys[193]=new Array('qz','衢州','quzhou','quzhou','162','zhejiang','浙江','','',33,0);

citys[194]=new Array('lps','六盘水','liupanshui','liupanshui','325','guizhou','贵州','','',37,0);

citys[195]=new Array('zk','周口','zhoukou','zhoukou','30','henan','河南','','',299,0);

citys[196]=new Array('bs','白山','baishan','baishan','382','jilin','吉林','','',89,0);

citys[197]=new Array('la','六安','luan','luan','41','anhui','安徽','','',132,0);

citys[198]=new Array('tl','铜陵','tongling','tongling','39','anhui','安徽','','',312,0);

citys[199]=new Array('sz','池州','chizhou','chizhou','236','anhui','安徽','','',315,0);

citys[200]=new Array('jc','晋城','jincheng','jincheng','119','shanxi','山西','','',159,0);

citys[201]=new Array('hs','黄石','huangshi','huangshi','49','hubei','湖北','','',195,0);

citys[202]=new Array('xx','湘西','xiangxi','xiangxi','745','hunan','湖南','','',337,0);

citys[203]=new Array('yc','宜春','yichunjx','jxyichun','156','jiangxi','江西','','',222,0);

citys[204]=new Array('mm','茂名','maoming','maoming','61','guangdong','广东','','',22,0);

citys[205]=new Array('mz','梅州','meizhou','meizhou','113','guangdong','广东','','',266,0);

citys[206]=new Array('ls','凉山','liangshan','liangshan','974','sichuan','四川','','',54,0);

citys[207]=new Array('yb','宜宾','yibin','yibin','182','sichuan','四川','','',52,0);

citys[208]=new Array('hz','湖州','huzhou','huzhou','2895','zhejiang','浙江','','',30,0);

citys[209]=new Array('py','濮阳','puyang','puyang','26','henan','河南','','',294,0);

citys[210]=new Array('cz','滁州','chuzhou','chuzhou','104','anhui','安徽','','',128,0);

citys[211]=new Array('ya','延安','yanan','yanan','306','shanxi','陕西','','',181,0);

citys[212]=new Array('nj','内江','neijiang','neijiang','66','sichuan','四川','','',277,0);

citys[213]=new Array('np','南平','nanping','nanping','523','fujian','福建','','',81,0);

citys[214]=new Array('smx','三门峡','sanmenxia','sanmenxia','47','henan','河南','','',296,0);

citys[215]=new Array('ly','辽源','liaoyuan','liaoyuan','19','jilin','吉林','','',87,0);

citys[216]=new Array('sy','松原','songyuan','songyuan','89','jilin','吉林','','',90,0);

citys[217]=new Array('sys','双鸭山','shuangyashan','shuangyashan','10','heilongjiang','黑龙江','','',97,0);

citys[218]=new Array('fy','阜阳','fuyang','fuyang','67','anhui','安徽','','',129,0);

citys[219]=new Array('hs','黄山','huangshan','huangshan','1847','anhui','安徽','','',313,0);

citys[220]=new Array('byne','巴彦淖尔','bayannaoer','bayannaoer','22','neimenggu','内蒙古','','',152,0);

citys[221]=new Array('wn','渭南','weinan','weinan','241','shanxi','陕西','','',180,0);

citys[222]=new Array('xn','咸宁','xianning','xianning','60','hubei','湖北','','',329,0);

citys[223]=new Array('es','恩施','enshi','enshi','1465','hubei','湖北','','',331,0);

citys[224]=new Array('fz','抚州','fuzhouj','jxfuzhou','49','jiangxi','江西','','',223,0);

citys[225]=new Array('ly','龙岩','longyan','longyan','223','fujian','福建','','',82,0);

citys[226]=new Array('th','通化','tonghua','tonghua','255','jilin','吉林','','',88,0);

citys[227]=new Array('bc','白城','baicheng','baicheng','67','jilin','吉林','','',91,0);

citys[228]=new Array('xc','宣城','xuancheng','xuancheng','307','anhui','安徽','','',316,0);

citys[229]=new Array('xlgl','锡林郭勒','xilinguole','xilinguole','267','neimenggu','内蒙古','','',321,0);

citys[230]=new Array('sy','邵阳','shaoyang','shaoyang','48','hunan','湖南','','',208,0);

citys[231]=new Array('jdz','景德镇','jingdezhen','jingdezhen','501','jiangxi','江西','','',215,0);

citys[232]=new Array('qj','曲靖','qujing','qujing','97','yunnan','云南','','',226,0);

citys[233]=new Array('jy','揭阳','jieyang','jieyang','29','guangdong','广东','','',272,0);

citys[234]=new Array('gy','广元','guangyuan','guangyuan','137','sichuan','四川','','',275,0);

citys[235]=new Array('bz','巴中','bazhong','bazhong','35','sichuan','四川','','',281,0);

citys[236]=new Array('jy','济源','jiyuan','jiyuan','21','henan','河南','','',112,0);

citys[237]=new Array('hg','鹤岗','hegang','hegang','6','heilongjiang','黑龙江','','',96,0);

citys[238]=new Array('hh','黑河','heihe','heihe','158','heilongjiang','黑龙江','','',101,0);

citys[239]=new Array('ll','吕梁','lvliang','lvliang','44','shanxi','山西','','',323,0);

citys[240]=new Array('ts','天水','tianshui','tianshui','90','gansu','甘肃','','',169,0);

citys[241]=new Array('yl','榆林','sxyulin','sxyulin','20','shanxi','陕西','','',183,0);

citys[242]=new Array('px','萍乡','pingxiang','pingxiang','92','jiangxi','江西','','',216,0);

citys[243]=new Array('hm','哈密','hami','hami','9','xinjiang','新疆','','',244,0);

citys[244]=new Array('yf','云浮','yunfu','yunfu','25','guangdong','广东','','',273,0);

citys[245]=new Array('zg','自贡','zigong','zigong','153','sichuan','四川','','',46,0);

citys[246]=new Array('ab','阿坝','aba','aba','248','sichuan','四川','','',283,0);

citys[247]=new Array('nd','宁德','ningde','ningde','444','fujian','福建','','',83,0);

citys[248]=new Array('mas','马鞍山','maanshan','maanshan','19','anhui','安徽','','',126,0);

citys[249]=new Array('als','阿拉善','alashan','alashan','576','neimenggu','内蒙古','','',322,0);

citys[250]=new Array('yq','阳泉','yangquan','yangquan','32','shanxi','山西','','',157,0);

citys[251]=new Array('xy','新余','xinyu','xinyu','18','jiangxi','江西','','',218,0);

citys[252]=new Array('ks','喀什','kashi','kashi','3','xinjiang','新疆','','',247,0);

citys[253]=new Array('bj','毕节','bijie','bijie','32','guizhou','贵州','','',41,0);

citys[254]=new Array('qxn','黔西南','qianxinan','qianxinan','251','guizhou','贵州','','',42,0);

citys[255]=new Array('jx','鸡西','jixi','jixi','88','heilongjiang','黑龙江','','',95,0);

citys[256]=new Array('yc','伊春','hljyichun','hljyichun','257','heilongjiang','黑龙江','','',99,0);

citys[257]=new Array('dxal','大兴安岭','daxinganling','daxinganling','67','heilongjiang','黑龙江','','',303,0);

citys[258]=new Array('xz','宿州','suzhouah','ahsuzhou','82','anhui','安徽','','',130,0);

citys[259]=new Array('wz','梧州','wuzhou','wuzhou','82','guangxi','广西','','',135,0);

citys[260]=new Array('gg','贵港','guigang','guigang','11','guangxi','广西','','',137,0);

citys[261]=new Array('sz','朔州','shuozhou','shuozhou','14','shanxi','山西','','',160,0);

citys[262]=new Array('qy','庆阳','qingyang','qingyang','8','gansu','甘肃','','',174,0);

citys[263]=new Array('ez','鄂州','ezhou','ezhou','39','hubei','湖北','','',201,0);

citys[264]=new Array('aks','阿克苏','akesu','akesu','19','xinjiang','新疆','','',246,0);

citys[265]=new Array('sw','汕尾','shanwei','shanwei','321','guangdong','广东','','',267,0);

citys[266]=new Array('ga','广安','guangan','guangan','47','sichuan','四川','','',278,0);

citys[267]=new Array('zy','资阳','ziyang','ziyang','45','sichuan','四川','','',282,0);

citys[268]=new Array('as','安顺','anshun','anshun','197','guizhou','贵州','','',39,0);

citys[269]=new Array('qdn','黔东南','qiandongnan','qiandongnan','823','guizhou','贵州','','',43,0);

citys[270]=new Array('qth','七台河','qitaihe','qitaihe','3','heilongjiang','黑龙江','','',301,0);

citys[271]=new Array('hs','河池','hechi','hechi','44','guangxi','广西','','',140,0);

citys[272]=new Array('wh','乌海','wuhai','wuhai','18','neimenggu','内蒙古','','',147,0);

citys[273]=new Array('zy','张掖','zhangye','zhangye','252','gansu','甘肃','','',171,0);

citys[274]=new Array('jq','酒泉','jiuquan','jiuquan','487','gansu','甘肃','','',173,0);

citys[275]=new Array('ln','陇南','longnan','longnan','20','gansu','甘肃','','',324,0);

citys[276]=new Array('snj','神农架','shennongjia','shennongjia','226','hubei','湖北','','',333,0);

citys[277]=new Array('klmy','克拉玛依','kelamayi','kelamayi','21','xinjiang','新疆','','',242,0);

citys[278]=new Array('yl','伊犁','yili','yili','212','xinjiang','新疆','','',252,0);

citys[279]=new Array('betl','博尔塔拉','boertala','boertala','3','xinjiang','新疆','','',251,0);

citys[280]=new Array('alt','阿勒泰','aletai','aletai','65','xinjiang','新疆','','',254,0);

citys[281]=new Array('ya','雅安','yaan','yaan','278','sichuan','四川','','',280,0);

citys[282]=new Array('gz','甘孜','ganzi','ganzi','563','sichuan','四川','','',284,0);

citys[283]=new Array('ls','丽水','lishui','lishui','826','zhejiang','浙江','','',285,0);

citys[284]=new Array('bz','亳州','bozhou','bozhou','35','anhui','安徽','','',314,0);

citys[285]=new Array('bs','百色','baise','baise','29','guangxi','广西','','',139,0);

citys[286]=new Array('hz','贺州','hezhou','hezhou','141','guangxi','广西','','',319,0);

citys[287]=new Array('wlcb','乌兰察布','wulanchabu','wulanchabu','61','neimenggu','内蒙古','','',153,0);

citys[288]=new Array('szs','石嘴山','shizuishan','shizuishan','1','ningxia','宁夏','','',339,0);

citys[289]=new Array('zw','中卫','zhongwei','zhongwei','131','ningxia','宁夏','','',342,0);

citys[290]=new Array('jc','金昌','jinchang','jinchang','8','gansu','甘肃','','',167,0);

citys[291]=new Array('by','白银','baiyin','baiyin','5','gansu','甘肃','','',168,0);

citys[292]=new Array('pl','平凉','pingliang','pingliang','14','gansu','甘肃','','',172,0);

citys[293]=new Array('dx','定西','dingxi','dingxi','3','gansu','甘肃','','',175,0);

citys[294]=new Array('tc','铜川','tongchuan','tongchuan','7','shanxi','陕西','','',177,0);

citys[295]=new Array('qj','潜江','qianjiang','qianjiang','5','hubei','湖北','','',203,0);

citys[296]=new Array('yt','鹰潭','yingtan','yingtan','32','jiangxi','江西','','',219,0);

citys[297]=new Array('zt','昭通','zhaotong','zhaotong','49','yunnan','云南','','',229,0);

citys[298]=new Array('bygl','巴音郭楞','bayinguoleng','bayinguoleng','31','xinjiang','新疆','','',249,0);

citys[299]=new Array('lz','林芝','linzhi','linzhi','108','xicang','西藏','','',262,0);

citys[300]=new Array('tr','铜仁','tongren','tongren','94','guizhou','贵州','','',40,0);

citys[301]=new Array('lb','来宾','laibin','laibin','14','guangxi','广西','','',141,0);

citys[302]=new Array('cz','崇左','chongzuo','chongzuo','25','guangxi','广西','','',320,0);

citys[303]=new Array('xz','忻州','xinzhou','xinzhou','86','shanxi','山西','','',163,0);

citys[304]=new Array('wz','吴忠','wuzhong','wuzhong','11','ningxia','宁夏','','',340,0);

citys[305]=new Array('gy','固原','guyuan','guyuan','7','ningxia','宁夏','','',341,0);

citys[306]=new Array('ww','武威','wuwei','wuwei','17','gansu','甘肃','','',170,0);

citys[307]=new Array('gn','甘南','gannan','gannan','15','gansu','甘肃','','',326,0);

citys[308]=new Array('hx','海西','haixi','haixi','229','qinghai','青海','','',193,0);

citys[309]=new Array('jm','荆门','jingmen','jingmen','23','hubei','湖北','','',200,0);

citys[310]=new Array('yx','玉溪','yuxi','yuxi','405','yunnan','云南','','',227,0);

citys[311]=new Array('hh','红河','honghe','honghe','371','yunnan','云南','','',234,0);

citys[312]=new Array('dh','德宏','dehong','dehong','35','yunnan','云南','','',238,0);

citys[313]=new Array('tlf','吐鲁番','tulufan','tulufan','14','xinjiang','新疆','','',243,0);

citys[314]=new Array('tc','塔城','tacheng','tacheng','1','xinjiang','新疆','','',253,0);

citys[315]=new Array('qn','黔南','qiannan','qiannan','331','guizhou','贵州','','',44,0);

citys[316]=new Array('hb','鹤壁','hebi','hebi','12','henan','河南','','',107,0);

citys[317]=new Array('wzs','五指山','wuzhishan','wuzhishan','26','hainan','海南','','',353,0);

citys[318]=new Array('xa','兴安','xingan','xingan','184','neimenggu','内蒙古','','',154,0);

citys[319]=new Array('jyg','嘉峪关','jiayuguan','jiayuguan','151','gansu','甘肃','','',343,0);

citys[320]=new Array('lx','临夏','linxia','linxia','13','gansu','甘肃','','',325,0);

citys[321]=new Array('sl','商洛','shangluo','shangluo','45','shanxi','陕西','','',185,0);

citys[322]=new Array('hd','海东','haidong','haidong','71','qinghai','青海','','',187,0);

citys[323]=new Array('hb','海北','haibei','haibei','195','qinghai','青海','','',188,0);

citys[324]=new Array('xt','仙桃','xiantao','xiantao','1','hubei','湖北','','',202,0);

citys[325]=new Array('sz','随州','suizhou','suizhou','11','hubei','湖北','','',330,0);

citys[326]=new Array('bs','保山','baoshan','baoshan','448','yunnan','云南','','',228,0);

citys[327]=new Array('cx','楚雄','chuxiong','chuxiong','27','yunnan','云南','','',236,0);

citys[328]=new Array('pe','普洱','puer','puer','101','yunnan','云南','','',231,0);

citys[329]=new Array('lc','临沧','lincang','lincang','8','yunnan','云南','','',232,0);

citys[330]=new Array('ws','文山','wenshan','wenshan','151','yunnan','云南','','',233,0);

citys[331]=new Array('nj','怒江','nujiang','nujiang','1','yunnan','云南','','',239,0);

citys[332]=new Array('dq','迪庆','diqing','diqing','170','yunnan','云南','','',240,0);

citys[333]=new Array('ht','和田','hetian','hetian','1','xinjiang','新疆','','',245,0);

citys[334]=new Array('wjq','五家渠','wujiaqu','wujiaqu','3','xinjiang','新疆','','',376,0);

citys[335]=new Array('wc','文昌','wenchang','wc','297','hainan','海南','','',397,0);

citys[336]=new Array('qh','琼海','qionghai','qionghai','414','hainan','海南','','',399,0);

citys[337]=new Array('dz','儋州','danzhou','danzhou','170','hainan','海南','','',400,0);

citys[338]=new Array('wn','万宁','wanning','wanning','405','hainan','海南','','',401,0);

citys[339]=new Array('df','东方','dongfang','dongfang','55','hainan','海南','','',402,0);

citys[340]=new Array('da','定安','dingan','dingan','13','hainan','海南','','',403,0);

citys[341]=new Array('tc','屯昌','tunchang','tunchang','3','hainan','海南','','',404,0);

citys[342]=new Array('cm','澄迈','chengmai','chengmai','169','hainan','海南','','',405,0);

citys[343]=new Array('lg','临高','lingao','lingao','26','hainan','海南','','',406,0);

citys[344]=new Array('bs','白沙','baisha','baisha','2','hainan','海南','','',407,0);

citys[345]=new Array('cj','昌江','changjiang','changjiang','28','hainan','海南','','',408,0);

citys[346]=new Array('ld','乐东','ledong','ledong','42','hainan','海南','','',409,0);

citys[347]=new Array('ls','陵水','lingshui','lingshui','520','hainan','海南','','',410,0);

citys[348]=new Array('bt','保亭','baoting','baoting','23','hainan','海南','','',411,0);

citys[349]=new Array('qz','琼中','qiongzhong','qiongzhong','13','hainan','海南','','',412,0);

citys[350]=new Array('ylx','宜兰县','yilanxian','ylxian','8','taiwan','台湾','','',393,0);

citys[351]=new Array('tb','台北','taibei','taipei','992','taiwan','台湾','','',378,0);

citys[352]=new Array('xb','新北','xinbei','newnorth','15','taiwan','台湾','','',379,0);

citys[353]=new Array('tz','台中','taizhong','taichung','371','taiwan','台湾','','',380,0);

citys[354]=new Array('tn','台南','tainan','tainan','403','taiwan','台湾','','',381,0);

citys[355]=new Array('gx','高雄','gaoxiong','kaohsiung','473','taiwan','台湾','','',382,0);

citys[356]=new Array('xz','新竹','xinzhu','hsinchu','2','taiwan','台湾','','',384,0);

citys[357]=new Array('jy','嘉义','jiayi','chiayi','240','taiwan','台湾','','',385,0);

citys[358]=new Array('tys','桃园市','taoyuanshi','taoyuan','1','taiwan','台湾','','',386,0);

citys[359]=new Array('ntx','南投县','nantouxian','ntx','536','taiwan','台湾','','',390,0);

citys[360]=new Array('hlx','花莲县','hualianxian','hlx','800','taiwan','台湾','','',394,0);

citys[361]=new Array('tdx','台东县','taidongxian','tdx','1','taiwan','台湾','','',395,0);

citys[362]=new Array('phx','澎湖县','penghuxian','phx','3','taiwan','台湾','','',396,0);

citys[363]=new Array('pdx','屏东县','pingdongxian','pingtungcounty','663','taiwan','台湾','','',2764,0);

var abroadcitys=new Array();

abroadcitys[0]=new Array('chagnye','长野','changye','nagano','3','changye','长野县','','',2836,1,'+9:00');

abroadcitys[1]=new Array('qingsen','青森','qingsen','aomori','1','qingsen','青森县','','',2838,1,'+9:00');

abroadcitys[2]=new Array('yazhuang','芽庄','yazhuang','yazhuang','61','qinghe','庆和','','',2840,1,'+07:00');

abroadcitys[3]=new Array('hjha','黄金海岸','huangjinhaian','goldcoast','13','','昆士兰','','',532,1,'+10:00');

abroadcitys[4]=new Array('dld','多伦多','duolunduo','toronto','33','','安大略省','','',712,1,'-06:00');

abroadcitys[5]=new Array('wdly','维多利亚','weiduoliya','weiduoliya','5','','不列颠哥伦比亚省','','',716,1,'-08:00');

abroadcitys[6]=new Array('ns','尼斯','nisi','nice','2','','普罗旺斯-阿尔卑斯-蓝色海岸','','',951,1,'+01:00');

abroadcitys[7]=new Array('aikesi','艾克斯','aikesi','aixenprovence','1','','普罗旺斯-阿尔卑斯-蓝色海岸','','',953,1,'+01:00');

abroadcitys[8]=new Array('bl','柏林','bailin','berlin','16','','柏林','','',968,1,'+01:00');

abroadcitys[9]=new Array('yd','雅典','yadian','athens','39','','阿提卡大区','','',1019,1,'+02:00');

abroadcitys[10]=new Array('ml','米兰','milan','milan','21','','伦巴第','','',1150,1,'+01:00');

abroadcitys[11]=new Array('wns','威尼斯','weinisi','venice','15','','威尼托','','',1155,1,'+01:00');

abroadcitys[12]=new Array('flls','佛罗伦萨','foluolunsa','florence','6','','托斯卡纳','','',1174,1,'+01:00');

abroadcitys[13]=new Array('lm','罗马','luoma','rome','21','','拉齐奥','','',1181,1,'+01:00');

abroadcitys[14]=new Array('mgw','名古屋','nagoya','nagoya','529','','爱知县','','',1193,1,'+09:00');

abroadcitys[15]=new Array('zh','札幌','sapporo','sapporo','547','','北海道','','',1194,1,'+09:00');

abroadcitys[16]=new Array('fg','福冈','fugang','fukuoka','147','','福冈县','','',1197,1,'+09:00');

abroadcitys[17]=new Array('cs','冲绳','chongsheng','okinawa','470','chongsheng','冲绳县','','',1218,1,'+09:00');

abroadcitys[18]=new Array('ml','马累','malei','male','1','','马累','','',1620,1,'+05:00');

abroadcitys[19]=new Array('msk','莫斯科','mosike','moscow','25','','中央','','',1897,1,'+03:00');

abroadcitys[20]=new Array('sbdb','圣彼得堡','shengbidebao','saintpetersburg','9','','西北','','',1914,1,'+03:00');

abroadcitys[21]=new Array('bsln','巴塞罗那','basailuona','barcelona','46','','巴塞罗那','','',2049,1,'+01:00');

abroadcitys[22]=new Array('mdl','马德里','madeli','madrid','49','','马德里','','',2060,1,'+01:00');

abroadcitys[23]=new Array('adb','爱丁堡','aidingbao','edinburgh','5','','苏格兰','','',2210,1,'+00:00');

abroadcitys[24]=new Array('ld','伦敦','lundun','london','41','','英格兰','','',2242,1,'+00:00');

abroadcitys[25]=new Array('hsd','华盛顿','huashengdun','washington','1','','哥伦比亚特区','','',2350,1,'-05:00');

abroadcitys[26]=new Array('xyt','西雅图','xiyatu','seattle','7','','华盛顿','','',2353,1,'-08:00');

abroadcitys[27]=new Array('jjs','旧金山','jiujinshan','sanfrancisco','66','','加利福尼亚','','',2360,1,'-08:00');

abroadcitys[28]=new Array('bsd','波士顿','boshidun','boston','5','','马萨诸塞','','',2406,1,'-05:00');

abroadcitys[29]=new Array('lswjs','拉斯维加斯','lasiweijiasi','lasvegas','45','','内华达','','',2460,1,'-07:00');

abroadcitys[30]=new Array('ny','纽约','niuyue','newyork','55','','纽约','','',2465,1,'-05:00');

abroadcitys[31]=new Array('zjg','芝加哥','zhijiage','chicago','15','','伊利诺斯','','',2534,1,'-06:00');

abroadcitys[32]=new Array('alw','埃里温','ailiwen','yerwin','1','','埃里温市','','',517,1,'+05:00');

abroadcitys[33]=new Array('blsb','布里斯班','bulisiban','brisbane','29','','昆士兰','','',531,1,'+10:00');

abroadcitys[34]=new Array('kes','凯恩斯','kaiensi','keynes','7','','昆士兰','','',533,1,'+10:00');

abroadcitys[35]=new Array('hbt','霍巴特','huobate','hobart','15','','塔斯马尼亚','','',547,1,'+10:00');

abroadcitys[36]=new Array('lssd','朗塞斯顿','langsaisidun','lausington','6','','塔斯马尼亚','','',548,1,'+10:00');

abroadcitys[37]=new Array('ps','珀斯','bosi','perth','2','','西澳大利亚','','',557,1,'+08:00');

abroadcitys[38]=new Array('nkse','纽卡斯尔','niukasier','niukasier','1','','新南威尔士','','',558,1,'+10:00');

abroadcitys[39]=new Array('wyn','维也纳','weiyena','vienna','22','','维也纳','','',569,1,'+01:00');

abroadcitys[40]=new Array('blse','布鲁塞尔','bulusaier','brussels','2','','布鲁塞尔首都大区','','',599,1,'+01:00');

abroadcitys[41]=new Array('sbl','圣保罗','shengbaoluo','stpaul','1','','东南地区','','',660,1,'-03:00');

abroadcitys[42]=new Array('wl','文莱','wenlai','brunei','3','','文莱','','',664,1,'+08:00');

abroadcitys[43]=new Array('sfy','索非亚','suofeiya','sofia','1','','索非亚市','','',665,1,'+02:00');

abroadcitys[44]=new Array('fldld','弗雷德里顿','fuleidelidun','fredericton','1','','新不伦瑞克省','','',710,1,'-04:00');

abroadcitys[45]=new Array('wnb','温尼伯','wennibo','winnipeg','4','','马尼托巴省','','',713,1,'-06:00');

abroadcitys[46]=new Array('ylnf','耶洛奈夫','yeluonaifu','yellowknife','1','','西北地区','','',717,1,'-07:00');

abroadcitys[47]=new Array('blg','布拉格','bulage','prague','13','bulage','布拉格','','',775,1,'+01:00');

abroadcitys[48]=new Array('gbhg','哥本哈根','gebenhagen','copenhagen','2','','京畿','','',785,1,'+01:00');

abroadcitys[49]=new Array('kl','开罗','kailuo','cairo','2','','开罗','','',823,1,'+02:00');

abroadcitys[50]=new Array('hexj','赫尔辛基','heerxinji','helsinki','2','','新地区','','',847,1,'+02:00');

abroadcitys[51]=new Array('asb','埃斯波','aisibo','espoo','1','','新地区','','',848,1,'+02:00');

abroadcitys[52]=new Array('ml','默伦','molun','mullen','2','','法兰西岛','','',857,1,'+01:00');

abroadcitys[53]=new Array('nte','楠泰尔','nantaier','nantaire','5','','法兰西岛','','',860,1,'+01:00');

abroadcitys[54]=new Array('klty','克雷泰伊','keleitaiyi','cretay','1','','法兰西岛','','',862,1,'+01:00');

abroadcitys[55]=new Array('le','里尔','lier','lille','1','','北部-加莱海峡-皮卡第','','',878,1,'+01:00');

abroadcitys[56]=new Array('blw','布卢瓦','buluwa','blois','1','','中央-卢瓦尔谷','','',890,1,'+01:00');

abroadcitys[57]=new Array('ar','阿让','arang','agen','1','','阿基坦-利穆赞-普瓦图-夏朗德','','',920,1,'+01:00');

abroadcitys[58]=new Array('la','里昂','liang','lyon','1','','奥弗涅-罗讷-阿尔卑斯','','',940,1,'+01:00');

abroadcitys[59]=new Array('anx','阿讷西','anaxi','annexi','1','','奥弗涅-罗讷-阿尔卑斯','','',944,1,'+01:00');

abroadcitys[60]=new Array('dsedf','杜塞尔多夫','dusaierduofu','dusseldorf','1','','北莱茵-威斯特法伦','','',973,1,'+01:00');

abroadcitys[61]=new Array('kl','科隆','kelong','cologne','1','','北莱茵-威斯特法伦','','',974,1,'+01:00');

abroadcitys[62]=new Array('flkf','法兰克福','falankefu','frankfurt','12','','黑森','','',978,1,'+01:00');

abroadcitys[63]=new Array('xbe','下拜恩','xiabaien','lowerbyrne','1','','拜恩（巴伐利亚）','','',990,1,'+01:00');

abroadcitys[64]=new Array('dlsd','德累斯顿','deleisidun','dresden','1','','萨克森','','',1005,1,'+01:00');

abroadcitys[65]=new Array('bdps','布达佩斯','budapeisi','budapest','7','','布达佩斯','','',1067,1,'+01:00');

abroadcitys[66]=new Array('yjd','雅加达','yajiada','jakarta','191','','大雅加达首都特区','','',1124,1,'+07:00');

abroadcitys[67]=new Array('wl','万隆','wanlong','bandung','62','','西爪哇省','','',1126,1,'+07:00');

abroadcitys[68]=new Array('ss','泗水','sishui','shuishui','20','','东爪哇省','','',1127,1,'+07:00');

abroadcitys[69]=new Array('rr','日惹','rire','yogyas','46','','日惹特区','','',1128,1,'+07:00');

abroadcitys[70]=new Array('dbl','都柏林','erbailin','dublin','1','','伦斯特省','','',1133,1,'+00:00');

abroadcitys[71]=new Array('ylsl','耶路撒冷','yelusaleng','jerusalem','1','','耶路撒冷区','','',1141,1,'+02:00');

abroadcitys[72]=new Array('bs','比萨','bisa','pisa','1','','托斯卡纳','','',1177,1,'+01:00');

abroadcitys[73]=new Array('hb','横滨','hengbin','yokohama','27','','神奈川县','','',1192,1,'+09:00');

abroadcitys[74]=new Array('sh','神戸','shenhu','kobe','295','','兵库县','','',1195,1,'+09:00');

abroadcitys[75]=new Array('cq','川崎','chuanqi','kawasaki','1','','神奈川县','','',1198,1,'+09:00');

abroadcitys[76]=new Array('qy','埼玉','qiyu','saitama','2','','埼玉县','','',1199,1,'+09:00');

abroadcitys[77]=new Array('gd','广岛','guangdao','hiroshima','15','','广岛县','','',1200,1,'+09:00');

abroadcitys[78]=new Array('xt','仙台','xiantai','sendai','17','','宫城县','','',1201,1,'+09:00');

abroadcitys[79]=new Array('qy','千叶','qianye','chiba','2','','千叶县','','',1203,1,'+09:00');

abroadcitys[80]=new Array('j','堺','jie','sakai','4','','大阪府','','',1204,1,'+09:00');

abroadcitys[81]=new Array('jg','静冈','jinggang','shizuoka','5','','静冈县','','',1207,1,'+09:00');

abroadcitys[82]=new Array('xb','熊本','xiongben','kumamoto','2','','熊本县','','',1210,1,'+09:00');

abroadcitys[83]=new Array('cq','船桥','chuanqiao','ship','1','','千叶县','','',1212,1,'+09:00');

abroadcitys[84]=new Array('bwz','八王子','bawangzibawangzi','hachiji','3','','东京都','','',1213,1,'+09:00');

abroadcitys[85]=new Array('zl','姫路','jilu','himeji','1','','兵库县','','',1214,1,'+09:00');

abroadcitys[86]=new Array('ddb','东大阪','dongdaban','eastosaka','2','','大阪府','','',1216,1,'+09:00');

abroadcitys[87]=new Array('nl','奈良','nara','nara','111','','奈良县','','',1217,1,'+09:00');

abroadcitys[88]=new Array('jb','金边','jinbian','phnompenh','17','','金边市','','',1232,1,'+07:00');

abroadcitys[89]=new Array('xl','暹粒','xianli','siemreap','40','','暹粒省','','',1237,1,'+07:00');

abroadcitys[90]=new Array('cz','柴桢','chaizhen','firewood','1','','柴桢','','',1240,1,'+07:00');

abroadcitys[91]=new Array('nlb','内罗毕','neiluobi','nairobi','1','','内罗毕','','',1284,1,'+03:00');

abroadcitys[92]=new Array('mbs','蒙巴萨','mengbasa','mombasa','1','','滨海省','','',1285,1,'+03:00');

abroadcitys[93]=new Array('dq','大邱','daqiu','daegu','3','','大邱','','',1291,1,'+09:00');

abroadcitys[94]=new Array('rc','仁川','renchuan','incheon','344','','仁川','','',1293,1,'+09:00');

abroadcitys[95]=new Array('sc','束草','shucao','sokcho','3','','江原道','','',1310,1,'+09:00');

abroadcitys[96]=new Array('qz','庆州','qingzhou','gyeongju','77','','庆尚北道','','',1328,1,'+09:00');

abroadcitys[97]=new Array('jj','巨済','juji','giant','1','','庆尚南道','','',1345,1,'+09:00');

abroadcitys[98]=new Array('qz','全州','quanz','statewide','156','','全罗北道','','',1392,1,'+09:00');

abroadcitys[99]=new Array('sy','水原','shuiyuan','suwon','3','','京畿道','','',1446,1,'+09:00');

abroadcitys[100]=new Array('ws','乌山','wushan','oshan','1','','京畿道','','',1447,1,'+09:00');

abroadcitys[101]=new Array('wx','万象','wanxiang','vientiane','1','','万象首都','','',1461,1,'+07:00');

abroadcitys[102]=new Array('bc','槟城','bincheng','penang','106','','槟榔屿','','',1496,1,'+08:00');

abroadcitys[103]=new Array('mlj','马六甲','maliujia','malacca','145','','马六甲','','',1527,1,'+08:00');

abroadcitys[104]=new Array('ylyy','亚罗牙也','yaluoyaye','arroyoalso','1','','马六甲','','',1528,1,'+08:00');

abroadcitys[105]=new Array('yb','怡保','yibao','ipoh','45','','霹雳','','',1550,1,'+08:00');

abroadcitys[106]=new Array('fsg','丰盛港','fengshenggang','mercedesport','1','','柔佛','','',1552,1,'+08:00');

abroadcitys[107]=new Array('xs','新山','xinshan','johor','81','','柔佛','','',1558,1,'+08:00');

abroadcitys[108]=new Array('dyl','斗亚兰','eryalan','doolan','1','','沙巴','','',1574,1,'+08:00');

abroadcitys[109]=new Array('gdmld','哥打马鲁都','gedamaluer','kotamarutu','1','','沙巴','','',1576,1,'+08:00');

abroadcitys[110]=new Array('xbn','仙本那','xianbenna','sakamoto','27','','沙巴','','',1588,1,'+08:00');

abroadcitys[111]=new Array('bdl','八打灵','badaling','petition','3','','雪兰莪','','',1600,1,'+08:00');

abroadcitys[112]=new Array('glxle','瓜拉雪兰莪','gualaxuelane','guaraselangor','15','','雪兰莪','','',1603,1,'+08:00');

abroadcitys[113]=new Array('sban','沙白安南','shabaiannan','sandwhiteannan','1','','雪兰莪','','',1604,1,'+08:00');

abroadcitys[114]=new Array('xb','雪邦','xuebang','spontan','2','','雪兰莪','','',1607,1,'+08:00');

abroadcitys[115]=new Array('fld','费利杜','feilidu','felicu','2','','费利杜','','',1616,1,'+05:00');

abroadcitys[116]=new Array('mxgc','墨西哥城','moxigecheng','mexico','1','','联邦区','','',1646,1,'-06:00');

abroadcitys[117]=new Array('ksblk','卡萨布兰卡','kasabulanka','casablanca','5','','卡萨布兰卡','','',1697,1,'+00:00');

abroadcitys[118]=new Array('mlks','马拉喀什','malakashi','marrakech','1','','马拉喀什','','',1699,1,'+00:00');

abroadcitys[119]=new Array('wdhk','温得和克','wendeheke','windhoek','1','','霍马斯','','',1702,1,'+01:00');

abroadcitys[120]=new Array('jdmd','加德满都','jiademaner','kathmandu','6','','加德满都','','',1711,1,'+05:45');

abroadcitys[121]=new Array('amstd','阿姆斯特丹','amusitedan','amsterdam','19','','北荷兰','','',1728,1,'+01:00');

abroadcitys[122]=new Array('hmed','哈密尔顿','hamierdun','hamilton','2','','怀卡托','','',1744,1,'+12:00');

abroadcitys[123]=new Array('bpmsd','北帕默斯顿','beipmsd','beipmsd','1','','玛纳瓦图/旺格努伊','','',1748,1,'+12:00');

abroadcitys[124]=new Array('lm','利马','lima','lima','2','','利马','','',1795,1,'-05:00');

abroadcitys[125]=new Array('dgs','迪戈斯','digesi','digos','60','dawoqu','达沃区','','',1798,1,'+08:00');

abroadcitys[126]=new Array('hs','华沙','huasha','warsaw','2','','马佐夫舍','','',1822,1,'+01:00');

abroadcitys[127]=new Array('lsb','里斯本','lisiben','lisbon','3','','大里斯本','','',1871,1,'+00:00');

abroadcitys[128]=new Array('yekck','伊尔库茨克','yierkucike','irkutsk','1','','西伯利亚','','',1957,1,'+08:00');

abroadcitys[129]=new Array('hcw','海参崴','haicanwei','vladivostok','1','','远东','','',1968,1,'+09:00');

abroadcitys[130]=new Array('mlj','马拉加','malajia','malaga','1','','马拉加','','',2024,1,'+01:00');

abroadcitys[131]=new Array('swly','塞维利亚','saiweiliya','seville','1','','塞维利亚','','',2025,1,'+01:00');

abroadcitys[132]=new Array('pem','帕尔马','paem','paem','1','','巴利阿里群岛','','',2030,1,'+01:00');

abroadcitys[133]=new Array('hln','赫罗纳','heluona','girona','1','','赫罗纳','','',2050,1,'+01:00');

abroadcitys[134]=new Array('blxy','巴伦西亚','balunxiya','valencia','2','','巴伦西亚','','',2068,1,'+01:00');

abroadcitys[135]=new Array('klp','科伦坡','kelunpo','colombo','5','','科伦坡县','','',2069,1,'+05:30');

abroadcitys[136]=new Array('ngb','尼甘布','niganbu','negambo','3','','加姆珀哈县','','',2075,1,'+05:30');

abroadcitys[137]=new Array('kt','康提','kangti','kandy','14','','康提县','','',2076,1,'+05:30');

abroadcitys[138]=new Array('sdgem','斯德哥尔摩','sidegeermo','stockholm','1','','斯德哥尔摩省','','',2117,1,'+01:00');

abroadcitys[139]=new Array('sls','苏黎世','sulishi','zurich','2','','苏黎世','','',2124,1,'+01:00');

abroadcitys[140]=new Array('ben','伯尔尼','boerni','berni','1','','伯尔尼','','',2125,1,'+01:00');

abroadcitys[141]=new Array('rnw','日内瓦','rineiwa','geneva','1','','日内瓦','','',2129,1,'+01:00');

abroadcitys[142]=new Array('akl','安卡拉','ankala','ankara','1','','安卡拉','','',2186,1,'+02:00');

abroadcitys[143]=new Array('db','迪拜','dibai','dubai','6','','迪拜酋长国','','',2203,1,'+04:00');

abroadcitys[144]=new Array('bmh','伯明翰','bominghan','birmingham','1','','英格兰','','',2222,1,'+00:00');

abroadcitys[145]=new Array('lst','列斯特','liesite','lester','1','','英格兰','','',2240,1,'+00:00');

abroadcitys[146]=new Array('mcst','曼彻斯特','manchesite','manchester','1','','英格兰','','',2243,1,'+00:00');

abroadcitys[147]=new Array('nj','牛津','niujin','oxford','6','','英格兰','','',2245,1,'+00:00');

abroadcitys[148]=new Array('sdl','桑德兰','sangdelan','sunderland','1','','英格兰','','',2254,1,'+00:00');

abroadcitys[149]=new Array('dls','达拉斯','dalasi','dallas','2','','德克萨斯','','',2308,1,'-06:00');

abroadcitys[150]=new Array('klfl','克利夫兰','kelifulan','cleveland','1','','俄亥俄','','',2317,1,'-05:00');

abroadcitys[151]=new Array('ald','奥兰多','aolanduo','orlando','13','','佛罗里达','','',2338,1,'-05:00');

abroadcitys[152]=new Array('mam','迈阿密','maiami','miami','34','','佛罗里达','','',2343,1,'-05:00');

abroadcitys[153]=new Array('sdg','圣迭戈','shengdiege','sandiego','1','','加利福尼亚','','',2362,1,'-08:00');

abroadcitys[154]=new Array('shs','圣何塞','shenghs','shenghs','6','','加利福尼亚','','',2363,1,'-08:00');

abroadcitys[155]=new Array('xael','新奥尔良','xinaoerliang','neworleans','8','','路易斯安那','','',2395,1,'-06:00');

abroadcitys[156]=new Array('bfl','布法罗','bufaluo','buffalo','1','','纽约','','',2463,1,'-05:00');

abroadcitys[157]=new Array('txs','檀香山','tanxiangshan','honolulu','9','','夏威夷','','',2498,1,'-10:00');

abroadcitys[158]=new Array('ytld','亚特兰大','yatelanda','atlanta','1','','佐治亚','','',2550,1,'-05:00');

abroadcitys[159]=new Array('hn','河内','henei','hanoi','68','','河内市','','',2582,1,'+07:00');

abroadcitys[160]=new Array('hzm','胡志明','huzhiming','hochiminh','354','','胡志明市','','',2583,1,'+07:00');

abroadcitys[161]=new Array('fj','斐济','feiji','fiji','1','','苏瓦','','',2601,1,'+12:00');

abroadcitys[162]=new Array('dbls','第比利斯','dibilisi','tbilisi','8','','第比利斯','','',2603,1,'+04:00');

abroadcitys[163]=new Array('dke','达喀尔','dakaer','dakar','1','','达喀尔','','',2613,1,'+00:00');

abroadcitys[164]=new Array('kpd','开普敦','kaipudun','capetown','1','','开普敦','','',2616,1,'+02:00');

abroadcitys[165]=new Array('qzy','泉佐野','quanzuoye','izuzano','4','','大阪府','','',2630,1,'+09:00');

abroadcitys[166]=new Array('xjj','小金井','xiaojinjing','koganei','1','','东京都','','',2677,1,'+09:00');

abroadcitys[167]=new Array('mataram','马塔兰','mataram','mataram','2','nusaenggarabarat','西努沙登加拉','','',2714,1,'+08:00');

abroadcitys[168]=new Array('hakodate','函馆','hakodate','hakodate','11','','北海道','','',2715,1,'+09:00');

abroadcitys[169]=new Array('saipan','塞班岛','saipan','saipan','33','northernmariana','北马里亚纳','','',2716,1,'+10:00');

abroadcitys[170]=new Array('pasai','帕赛','pasai','pasay','6','maniladaduhui','马尼拉大都会','','',2719,1,'+08:00');

abroadcitys[171]=new Array('maynila','马尼拉','maynila','maynila','58','maniladaduhui','马尼拉大都会','','',2720,1,'+08:00');

abroadcitys[172]=new Array('makadi','马卡蒂','makadi','makati','4','maniladaduhui','马尼拉大都会','','',2723,1,'+08:00');

abroadcitys[173]=new Array('mandaluyon','曼达卢永','mandaluyong','mandaluyong','4','maniladaduhui','马尼拉大都会','','',2725,1,'+08:00');

abroadcitys[174]=new Array('paxige','帕西格','paxige','pasig','2','maniladaduhui','马尼拉大都会','','',2730,1,'+08:00');

abroadcitys[175]=new Array('tajige','塔吉格','tajige','tajig','1','maniladaduhui','马尼拉大都会','','',2733,1,'+08:00');

abroadcitys[176]=new Array('bashu','巴蜀','bashu','bayu','1','prachuap','班武里府','','',2735,1,'+7:00');

abroadcitys[177]=new Array('huaxin','华欣','huaxin','huaxin','815','prachuap','班武里府','','',2741,1,'+7:00');

abroadcitys[178]=new Array('beilan','北榄','beilan','northernlam','5','beilan','北榄','','',2744,1,'+7:00');

abroadcitys[179]=new Array('baixian','拜县','baixian','paicounty','120','yefengsong','夜丰颂','','',2745,1,'+7:00');

abroadcitys[180]=new Array('jiami','甲米','jiami','krabi','958','jiami','甲米','','',2746,1,'+7:00');

abroadcitys[181]=new Array('qinglaishi','清莱','qinglaishi','chiangrai','1','qinglai','清莱','','',2747,1,'+7:00');

abroadcitys[182]=new Array('gaosong','高松','gaosong','takamatsu','1','xiangchuan','香川','','',2748,1,'+09:00');

abroadcitys[183]=new Array('naba','那霸','naba','naha','20','chongsheng','冲绳县','','',2749,1,'+09:00');

abroadcitys[184]=new Array('shiyuan','石垣','shiyuan','ishigaki','1','chongsheng','冲绳县','','',2751,1,'+09:00');

abroadcitys[185]=new Array('putianshi','浦添','putianshi','putianshi','1','chongsheng','冲绳县','','',2752,1,'+09:00');

abroadcitys[186]=new Array('siman','糸满','siman','itoman','2','chongsheng','冲绳县','','',2754,1,'+09:00');

abroadcitys[187]=new Array('yuliuma','宇流麻','yuliuma','uruma','3','chongsheng','冲绳县','','',2756,1,'+09:00');

abroadcitys[188]=new Array('nancheng','南城','nancheng','nanjo','1','chongsheng','冲绳县','','',2758,1,'+09:00');

abroadcitys[189]=new Array('guotou','国头','guotou','guotou','2','chongsheng','冲绳县','','',2759,1,'+09:00');

abroadcitys[190]=new Array('boracay','长滩岛','boracay','boracay','21','ximishayan','西米沙鄢','','',2851,1,'+08:00');

abroadcitys[191]=new Array('coquitlam','高贵林','coquitlam','coquitlam','6','','不列颠哥伦比亚省','','',2743,1,'-08:00');

abroadcitys[192]=new Array('xiaozun','小樽','xiaozun','small','82','','北海道','','',2765,1,'+9:00');

abroadcitys[193]=new Array('jiangbie','江别','jiangbie','jiangbie','2','','北海道','','',2777,1,'+9:00');

abroadcitys[194]=new Array('fuliangye','富良野','fuliangye','furano','1','','北海道','','',2789,1,'+9:00');

abroadcitys[195]=new Array('kaerjiali','卡尔加里','kaerjiali','calgary','1','','艾伯塔省','','',2798,1,'-7:00');

abroadcitys[196]=new Array('vancouver','温哥华','vancouver','vancouver','16','','不列颠哥伦比亚省','','',2801,1,'-8:00');

abroadcitys[197]=new Array('westvancou','西温','westvancouver','westwen','3','','不列颠哥伦比亚省','','',2802,1,'-8:00');

abroadcitys[198]=new Array('richmond','列治文','richmond','richmondcan','21','','不列颠哥伦比亚省','','',2803,1,'-8:00');

abroadcitys[199]=new Array('burnaby','本那比','burnaby','benabi','9','','不列颠哥伦比亚省','','',2804,1,'-8:00');

abroadcitys[200]=new Array('surrey','素里','surrey','suri','5','','不列颠哥伦比亚省','','',2805,1,'-8:00');

abroadcitys[201]=new Array('whiterock','白石','whiterock','whitestone','1','','不列颠哥伦比亚省','','',2806,1,'-8:00');

abroadcitys[202]=new Array('newwestmin','新威斯敏斯特','newwestminster','newwestminster','2','','不列颠哥伦比亚省','','',2808,1,'-8:00');

abroadcitys[203]=new Array('shanzhongh','山中湖','shanzhonghu','yamanakako','1','shanli','山梨县','','',2831,1,'+09:00');

abroadcitys[204]=new Array('fushihekou','富士河口湖','fushihekouhu','fujikawaguchiko','23','shanli','山梨县','','',2833,1,'+09:00');

abroadcitys[205]=new Array('queenstown','皇后镇','queenstown','queenstown','1','','奥塔戈','','',2848,1,'+12:00');

abroadcitys[206]=new Array('istanbul','伊斯坦布尔','istanbul','istanbul','6','istanbul','伊斯坦布尔','','',2849,1,'+2:00');

abroadcitys[207]=new Array('fuguodao','富国岛','fuguodao','fuguodao','1','jianjiang','坚江','','',2850,1,'+7:00');

abroadcitys[208]=new Array('zbxj','足柄下郡','zubingxiajun','ashigarashimo','50','','神奈川县','','',2854,1,'+09:00');

abroadcitys[209]=new Array('mtle','蒙特利尔','mengtelier','montreal','9','','魁北克省','','',2855,1,'-04:00');

abroadcitys[210]=new Array('wotaihua','渥太华','wth','ottawa','4','','安大略省','','',2856,1,'-06:00');

abroadcitys[211]=new Array('nyjlpbc','尼亚加拉瀑布城','niyajialapubucheng','niagarafalls','2','','安大略省','','',2857,1,'-06:00');

abroadcitys[212]=new Array('lkw','兰卡威','lankawei','pulaulangkawi','1','','吉打','','',2858,1,'+08:00');

abroadcitys[213]=new Array('be','波恩','boen','bonn','1','','北莱茵-威斯特法伦','','',2860,1,'+01:00');

abroadcitys[214]=new Array('stln','圣托里尼','shengtuolini','santorini','3','','南爱琴大区','','',2875,1,'+02:00');

abroadcitys[215]=new Array('yintelaken','因特拉肯','yintelaken','interlaken','20','','伯尔尼','','',2876,1,'+01:00');

abroadcitys[216]=new Array('bkl','博卡拉','bokala','pokhara','7','gandaji','甘达基区','','',2879,1,'+05:45');

abroadcitys[217]=new Array('sw','宿务','suwu','cebu','1','zhongmishayan','中米沙鄢','','',2881,1,'+08:00');

abroadcitys[218]=new Array('bhd','薄荷岛','bohedao','boholisland','6','zhongmishayan','中米沙鄢','','',2882,1,'+08:00');

abroadcitys[219]=new Array('mt','虻田','mengtian','abuta','1','','北海道','','',2886,1,'+09:00');

abroadcitys[220]=new Array('jz','金泽','jinze','kanazawa','5','shichuan','石川县','','',2890,1,'+09:00');

abroadcitys[221]=new Array('rg','日光','riguang','nikko','2','limu','枥木县','','',2891,1,'+09:00');

abroadcitys[222]=new Array('lc','镰仓','liancang','kamakura','3','','神奈川县','','',2896,1,'+9:00');

abroadcitys[223]=new Array('luotuoluwa','罗托鲁瓦','luotuoluwashi','rotorua','1','','普伦蒂湾','','',2899,1,'+12:00');

abroadcitys[224]=new Array('gechangxia','阁昌','gechangxian','gechangxian','2','dalefu','达叻','','',2902,1,'+07:00');

abroadcitys[225]=new Array('jujun','橘郡','jujun','jujun','4','','加利福尼亚','','',2903,1,'-08:00');

abroadcitys[226]=new Array('songyuansh','松原','songyuanshi','songyuanshi','1','','大阪府','','',2917,1,'+09:00');

 
 function showVideo_youku(domid,vid,autoplay)    
{
    player = new YKU.Player(domid,{
        styleid: '0',
        client_id: client_id_youku,
        vid:vid,
        autoplay: autoplay,
        show_related: false,
        events:{
            onPlayerReady: function(){ /*your code*/ },
            onPlayStart: function(){ /*your code*/ },
            onPlayEnd: function(){ /*your code*/ }
        }
    });
}
 
 
// remotejs start from https://player.youku.com/jsapi 11-14 16:57:24 
/**
 * dispatch 
 * dispatch 2019-02-25
 * for phone
 */
var YK = {};
YK.https = location.protocol;
window.YKU = {};
var YKP = {
  playerType: "",
  playerState: {
    PLAYER_STATE_INIT: 'PLAYER_STATE_INIT',
    PLAYER_STATE_READY: 'PLAYER_STATE_READY',
    PLAYER_STATE_AD: 'PLAYER_STATE_AD',
    PLAYER_STATE_PLAYING: 'PLAYER_STATE_PLAYING',
    PLAYER_STATE_END: 'PLAYER_STATE_END',
    PLAYER_STATE_ERROR: 'PLAYER_STATE_ERROR'
  },

  playerCurrentState: 'PLAYER_STATE_INIT',
  isLoadFinishH5: false,
  isPC: true,
  videoList: [],
  isAndroidYouku: false
};

var StaticDomain = YK.https + "//player.youku.com";

function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsIphone = sUserAgent.match(/iphone/i) == "iphone";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    YKP.isPC = false;
    //YKP.isSupportFlash = false;
  } else {
    YKP.isPC = true;
    //YKP.isSupportFlash = true;
  }
  var bIsYouku = sUserAgent.match(/youku/i) == "youku";
  if (bIsAndroid) {
    if (bIsYouku) {
      YKP.isAndroidYouku = true;
    }
  }

  if (bIsIphone) {
    if (bIsYouku) {
      YKP.isIphoneYouku = true;
    }
  }
}
browserRedirect();

function createIFrame(w, h, parentName, vid, partnerId, password, autoplay, events) {
  if (YKP.isPC) {
    var iframes = document.getElementById(parentName + '').getElementsByTagName("iframe");

    while (iframes.length) {
      var parentElement = iframes[0].parentNode;
      if (parentElement) {
        parentElement.removeChild(iframes[0])
      }
    }

    var iframe = document.createElement('iframe');
    iframe.setAttribute('width', w);
    iframe.setAttribute('height', h);
    iframe.setAttribute('allow', 'autoplay');
    var srcUrl = StaticDomain + '/embed/' + vid + '?client_id=' + partnerId + '&password=' + password + '&autoplay=' + autoplay+ '#' + window.location.host;

    if (events && events.onPlayStart) {
      srcUrl += '&onPlayStart=' + events.onPlayStart;
    }

    if (events && events.onPlayEnd) {
      srcUrl += '&onPlayEnd=' + events.onPlayEnd;
    }
    iframe.setAttribute('src', srcUrl);
    iframe.setAttribute('name','iframeId');
    iframe.setAttribute('id', 'iframeId');
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('scrolling', 'no');
    document.getElementById(parentName + '').appendChild(iframe);
    return iframe;
  }
  return null;
}

var urlParameter = function(object) {
  var arr = [];
  for (var o in object) {
    arr.push(o + '=' + object[o]);
  }
  return arr.join('&');
};

window.QS = function() {
  var args = {};
  var result = window.location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
  if (result != null) {
    for (var i = 0; i < result.length; i++) {
      var ele = result[i];
      var inx = ele.indexOf("=");
      //args[ele.substring(1, inx)] = ele.substring(inx + 1);
      var key = ele.substring(1, inx);
      var val = ele.substring(inx + 1);
      try {
        val = decodeURI(val);
      } catch (e) {

      }
      //è½¬æ¢val Boolean Number Object
      val == "true" ? val = true : (val == "false" ? val == false : isNaN(val) ? val = parseJsonStr(val) : val = +val);
      if ('undefined' == typeof args[key]) {
        args[key] = val;
      } else {
        if (args[key] instanceof Array) {
          args[key].push(val);
        } else {
          args[key] = [args[key], val];
        }
      }
    }
  }
  return args;
}

function parseJsonStr(str) {
  if ('string' != typeof str) {
    return str;
  }
  if (/{[^{^}]{0,}}/.test(str)) {
    try {
      str = JSON.parse(str);
    } catch (e) {

    }
  }
  return str;
}

var dynamicLoading = {
  css: function(path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
  },
  js: function(path, obj, attr) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    if (attr) {
      script["id"] = attr["id"];
      script.setAttribute('pageType', attr["pageType"]);
      script.setAttribute('isHidden', attr["isHidden"]);
    }
    head.appendChild(script);

    script.onload = function() {
      if (obj) {
        obj.selectH5();
        YKP.isLoadFinishH5 = true;
      }
    }
  }
}

dynamicLoading.css(YK.https + "//player.youku.com/unifull/css/unifull.min.css?v=20190124");

var YoukuPlayerSelect = function(params) {

  YK.initConfig = params;
  this._vid = params.vid;
  this._target = params.target;
  this._partnerId = params.partnerId;
  this._videoFlag = params.videoFlag;
  if (params.client_id) {
    //兼容openapi中的client_id的设置
    this._partnerId = params.client_id;
  }

  if (!(this._vid && this._target && this._partnerId)) {
    alert(
      "[Fail]The params of {vid,target,client_id} are necessary !"
    );
    return;
  }

  this._events = params.events;
  YK.playerEvents = params.events;

  this._id = params.id;
  if (this._id == null) this._id = "youku-player";
  YKP.playerId = this._id;
  this._width = params.width;
  this._height = params.height;
  this._expand = params.expand;
  if (params.width == null || params.height == null) {
    //宽高指定不全，默认为0
    if (params.expand == null) {
      this._expand = 0;
    }
  } else {
    //宽高都指定，默认为1
    if (params.expand == null) {
      this._expand = 1;
    }
  }

  // this._prefer = (params.prefer ? params.prefer.toLowerCase() : "flash");
  this._starttime = params.starttime;
  this._password = params.password ? params.password : '';
  this._poster = params.poster;
  this._autoplay = !!params.autoplay; // 0 ,1 ,true ,false,'true','false'..
  this._canWide = params.canWide;
  if ('undefined' != typeof params.show_related) {
    this._showRelated = !!params.show_related;
  }

  this._embed_content = params.embed_content;
  this._embed_vid = params.embed_vid;
  this._cancelFullScreen = params.cancelFullScreen;
  this._titleStyle = params.titleStyle;
  this._source = params.source;
  this._newPlayer = params.newPlayer;
  this._winType = params.wintype;

  //播放页专门参数
  this._playlistconfig = params.playlistconfig;
  this._isMobile = YKP.isMobile;
  this._isMobileIOS = YKP.isMobileIOS;

  //this._weixin = params.weixin;
  YK.isWeixin = YKP.isWeixin; //false;
  //微信专用参数
  if ('undefined' != typeof params.weixin) {
    YK.isWeixin = !!params.weixin; //!!å¤–éƒ¨ä¼ å…¥ weixin=fasle ä¹Ÿå¯ä»¥ç”Ÿæ•ˆ
  }

  this._loop = !!params.loop || false;
  // more ..

  this._playerType = "";

};
YoukuPlayerSelect.prototype = {
  isPC: function() {
    return YKP.isPC;
  }, //todo
  select: function() {
    this.selectHandler();
  },
  selectHandler: function() {
    var url;
    if (this.isPC()) {
      YKP.isLoadFinishH5 = true;
    } else {
      //	dynamicLoading.js(YK.https + "//g.alicdn.com/ku/ykbannerLoader/1.0.01/js/ykbannerLoader.min.js", null, {"id":"ykbannerLoader", "pageType":"player", "isHidden":true});
      url = YK.https + "//player.youku.com/unifull/js/unifull.min.js?v=20190318";
    }
    if (YKP.isLoadFinishH5) {
      this.selectH5();
    } else {
      dynamicLoading.js(url, this);
    }


    if (this._events && this._events.onPlayerReady) {
      var callback = this._events.onPlayerReady;
      var check = setInterval(function() {
        // if ($(YKP.playerId)) {
        //     YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_READY;
        //     debug.log(YKP.playerCurrentState);

        try {
          //    LocalStorage.appendItem('phase', 'playerready');
          callback();
        } catch (e) {}
        clearInterval(check);
        //}
      }, 500);
    }
  },
  selectH5: function() {
    if (YKP.isPC) {
      this.selectPCH5();
    } else {
      this.selectMobileH5();
    }
  },

  selectMobileH5: function() {
    var self = this;
    var playerDom = document.getElementById(this._target);
    if (this._width > 0 && this._height > 0) {
      playerDom.style.width = this._width + "px";
      playerDom.style.height = this._height + "px";
    } else {
      //var cw = document.documentElement.clientWidth;
      //var ch = document.documentElement.clientHeight;
      var cw = playerDom.offsetWidth;
      var ch = playerDom.offsetHeight;

      function resize(playerDom) {
        //playerDom.style.width = cw + "px";
        //playerDom.style.height = 9 * cw / 16 + "px";

        playerDom.style.width = cw + "px";
        playerDom.style.height = ch + "px";
      }
      resize(playerDom);
    }

    var closeFullFullScreen = 0;
    if (self._cancelFullScreen == 1 && YKP.isAndroidYouku) {
      closeFullFullScreen = 1;
    }

    var config = {
      videoId: self._vid, //视频id
      ccode: "0590", //渠道id
      client_id: self._partnerId, //优酷视频云创建应用的client_id
      control: {
        laguange: "", //默认使用的语言类型
        hd: "mp4hd", //默认使用的码率
        //   hd:"m3u8",
        autoplay: false //是否自动播放
      },
      logconfig: {

      }, //统计扩展参数，包括aplus接口中的全局对象时数据，用于传递给统计接口
      adConfig: {

      }, //广告扩展参数
      password: self._password, //视频播放密码，用于加密视频（这个是否可以传入暂定）
      wintype: "", //每端固定的参数，多用于统计，不确定是否还需要
      type: "", //播放类型（pc,pad,mobile）暂定,
      events: self._events,

      embed_vid: self._embed_vid,
      embed_content: self._embed_content,
      titleStyle: self._titleStyle,
      source: self._source,
      closeFullFullScreen: closeFullFullScreen,
      isIphoneYouku: YKP.isIphoneYouku,
      imgPoster: self._poster
    };
    this._h5player = YKPlayer.Player(this._target, config);
  },

  selectPCH5: function() {
    var self = this;
    self.mobtest = 'mobtest';
    var cw;
    var ch;
    if (this._width > 0 && this._height > 0) {
      cw = this._width;
      ch = this._height;
    } else {
      //var playerDom = document.getElementById(this._target);
      //var cw = document.documentElement.clientWidth;
      //var ch = document.documentElement.clientHeight;
      //var cw = playerDom.offsetWidth;
      //var ch = playerDom.offsetHeight;
      cw = '100%';
      ch = '100%';

    }
    createIFrame(cw, ch, self._target, self._vid, self._partnerId, self._password, self._autoplay, self._events);

  },

  onorientationchange: function() {
    //var self = this;
    var playerDom = document.getElementById(this._target);
    setTimeout(function() {
      var cw = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight;
      playerDom.style.width = cw + "px";
      playerDom.style.height = 9 * cw / 16 + "px";

    }, 300);
  },
  isThirdParty: function() {

    var cid = this._partnerId;
    if (cid != null && (cid + '').length == 16) {
      return true;
    };

    return false;
  },
};

/**
 * 以下是统一的接口，用于外部统一操作 Flash 和 H5播放器
 *   直接传入参数进行初始化
 *    -- api document --
 *   //open.youku.com/docs/api/player
 *   用户名：api
 *   密码：youkuopenapi
 *
 */
YKU.Player = function(target, config) {
  config.target = target;
  this.select = new YoukuPlayerSelect(config);
  this.select.select();
  this._player = "";
};
YKU.Player.prototype = {
  player: function() {
    if (this._player != "") {
      return this._player;
    }
    if (YKP.isPC) {
      this._player = new YKFlashPlayer();
    } else {
      this._player = new YKH5Player(this.select._h5player);
    }
    return this._player;
  },
  //@deprecated
  resize: function(dom, width, height) {
    if (dom && Number(width) && Number(height)) {
      dom.style ? dom.style.width = width + 'px' : null;
      dom.style ? dom.style.height = height + 'px' : null;
    } else {
      console.log('resize方法不可用,缺少参数!');
    }
  },
  currentTime: function() {
    return this.player().currentTime();
  },
  totalTime: function() {
    return this.player().totalTime();
  },
  playVideo: function() {
    this.player().playVideo();
  },
  startPlayVideo: function() {
    this.player().startPlayVideo();
  },
  pauseVideo: function() {
    this.player().pauseVideo();
  },
  seekTo: function(timeoffset) {
    this.player().seekTo(timeoffset);
  },
  hideControls: function() {
    this.player().hideControls();
  },
  showControls: function() {
    this.player().showControls();
  },
  /** mute:function(){},
   unmute:function(){},
   setVolume:function(){},
   getVideoMetaData:function(){},*/
  playVideoById: function(vid) {
    this.player().playVideoById(vid);
  },
  //special api for youku h5,not open api
  switchFullScreen: function() {
    try {
      this.player().switchFullScreen();
    } catch (e) {

    }

  },
  getVideoList: function() {
    return this.player().getVideoList();
  }

};

var YKFlashPlayer = function() {
  this._player = document.getElementById(YKP.playerId);
};
YKFlashPlayer.prototype = {
  resize: function(width, height) {
    this._player.style.width = width + 'px';
    this._player.style.height = height + 'px';
  },
  currentTime: function() {
    var arr = this._player.getPlayerState().split("|");
    if (arr.length >= 3)
      return arr[2];
    else
      return -1;
  },
  totalTime: function() {
    var arr = this._player.getPlayerState().split("|");
    if (arr.length >= 4)
      return arr[3];
    else
      return -1;
  },
  playVideo: function() {
    this._player.pauseVideo(false);
  },
  pauseVideo: function() {
    this._player.pauseVideo(true);
  },
  seekTo: function(timeoffset) {
    this._player.nsseek(timeoffset);
  },
  playVideoById: function(vid) { //encoded vid  å­—ç¬¦ä¸²å½¢å¼çš„vid
    this._player.playVideoByID(vid);
  },
  hideControls: function() {
    this._player.showControlBar(false);
  },
  showControls: function() {
    this._player.showControlBar(true);
  },
  state: function() {
    this._player.state();
  }
};

/**
 * @param player  YoukuHTML5Player
 */
var YKH5Player = function(player) {

  this._player = player;
};
YKH5Player.prototype = {
  resize: function(width, height) {
    this._player.style.width = width + 'px';
    this._player.style.height = height + 'px';
  },
  currentTime: function() {
    return this._player.currentTime;
  },
  totalTime: function() {
    return this._player.totalTime;

  },
  playVideo: function() {
    this._player.play();
  },

  pauseVideo: function() {
    this._player.pause();
  },

  seekTo: function(timeoffset) {
    try {
      //  this._player.currentTime = timeoffset;
      this._player.seek(timeoffset);
    } catch (e) {}
  }
}

function executeScript(){
    var _scripts = document.getElementsByTagName("script"),_len = _scripts.length;
    for(var i = 0 ; i < _len ;i++){
        if(_scripts[i].src.indexOf("//player.youku.com/jsapi") > -1){
            if(_scripts[i].innerHTML){
              console.log('%c优酷视频云:播放器初始化代码，请单独在新的script标签内。否则会造成无法播放！','color:red');
              eval(_scripts[i].innerHTML);
              break;
            }
        }
    }
}
executeScript();

// remotejs end from https://player.youku.com/jsapi 
 
 var imageLen = $('.banner_ul li').length;
var lastPic = imageLen - 1;
var firstPic = 0;
var timeInterval = 5000;
var fadeInOutTime = 2000;
var setInt;
$(document).ready(function(){
    showLazyLoadImage(firstPic);
    setBannerHeight();
    $('.banner_img').children('a').children('img').load(function(){
        setBannerHeight();
    })

    $("img").lazyload();
    if($.browser.msie&&($.browser.version == "6.0"))
    {
        document.execCommand("BackgroundImageCache", false, true);
    }
    $('.indexdialog').dialog({
        autoOpen:false,
        width:790,
        resizable: false,
        modal:true,
        draggable:false,
        position: "center"
    });
    $('.vediodialog').dialog({
        autoOpen:false,
        width:880,
        resizable: false,
        modal:true,
        draggable:false,
        position: "center"
    });
    var regiaterBtn = $('.head_bar .nav_R li').first().find('a');
    var inviteCode = $('#inviteCodeHidden').val();
    if(inviteCode){
        regiaterBtn.attr('href',regiaterBtn.attr('href')+'&invitecode='+inviteCode);
    }    
})
function springFestivalPop() {
    //截取字符串字段
    var getParam = function(paramName) {
        var sURL = window.document.URL.toString().replace(/#/, '&');
        if(sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");
            var arrURLParams = arrParams[1].split("&");
            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);
            for (var i=0;i<arrURLParams.length;i++) {
                var sParam =  arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "") {
                    arrParamValues[i] = unescape(sParam[1]);
                } else {
                    arrParamValues[i] = "";
                }
            }
            for (i=0;i<arrURLParams.length;i++) {
                if(arrParamNames[i] == paramName) {
                    return arrParamValues[i] == 'undefined' ? '' : arrParamValues[i] ;
                }
            }
            return '';
        }
        return '';
    }
//判断当前日期是否在指定日期内
    var utm_source = getParam('utm_source');
    var endTime='2019-02-14';
    var today=new Date();
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var day=today.getDate();
    var numPop;
    var storage=window.localStorage
    if(month<=9){
        month="0"+month;
    }
    if(day<=9){
        day="0"+day;
    }
    today=year+"-"+month+"-"+day;
    if(today<endTime){//对比日期大小与渠道来源
        if(utm_source == 'baidu'||utm_source =='360'||utm_source =='sogou'){
            numPop=Number(storage.getItem("numPop"));
            if(!numPop){
                numPop=1;
            }else if(numPop<3){
                numPop=numPop+1;
            }else{
                return false;
            }
            storage.numPop=numPop;
            $('#pop_springFestivalMask').show();
        }
        $("#pop_springFestivalImg").click(function(e) {
            e?e.stopPropagation():event.cancelBubble = true;
        });
        $(document).click(function() {
            $("#pop_springFestivalMask").fadeOut();
        });
    }
}
springFestivalPop();

function allVeryWellMask(){
    var year,month,day;
    var startTime='2019-03-19';
    var endTime='2019-04-27';
    var today=new Date();
    var formatToday;
    function format(date) {
        year=date.getFullYear();
        month=date.getMonth()+1;
        day=today.getDate();
        if(month<=9){
            month="0"+month;
        }
        if(day<=9){
            day="0"+day;
        }
        var data2=year+"-"+month+"-"+day;
        return data2;
    }
    formatToday=format(today);
    if(startTime<formatToday&&formatToday<endTime){
       $('#pop_allVeryWellMask').show();
    }
}
allVeryWellMask();
$("#pop_allVeryWellImg_close").click(function(e) {
    e?e.stopPropagation():event.cancelBubble = true;
    $('#pop_allVeryWellMask').hide();
});

$('#pop_allVeryWellMask').on('click',function(){
    window.location.href='https://m.xiaozhu.com/act/act_allVeryWell/pc.html?utm_campaign=doutinghao&utm_medium=cpc&utm_source=mengceng&utm_content=xiaozhu&utm_term=pcmengceng&gio_link_id=bR7r3Y9G';
})


    $('.nation_name').on('click',function(){
    $('.nation_name').removeClass('n_cur');
    $('#tip_searchcity').hide();
    $(this).addClass('n_cur');
    $('#suggestion_citydomain').val('');
    var abroad = $(this).attr('abroad');
    var isTrue = false
    if(abroad == 'true'){
//        $('#abrd').click();
        if($('#abroad').val() == 1){
            return;
        } 
        isTrue = true;
        $('#abroad').val(1);
        $('.sug-city a').removeClass('a_over');
        $('#searchcity').text(defaultAbroadCity).attr('value',defaultAbroadCity).attr('readonly',true);
        defaultCity = defaultAbroadCity;
        city_name = defaultAbroadCity;
        $('#defaultCityShowStr').val(defaultAbroadCity);
    }else{
        if($('#abroad').val() == 0) return;
        $('#abroad').val(0);
        $('#timeZone').val('');
        $('.sug-city a').removeClass('a_over');
        $('#searchcity').text(defaultInCity).attr('value',defaultInCity).attr('readonly',false);
        isTrue = false;
        defaultCity =  city_name =  defaultInCity;
        $('#defaultCityShowStr').val(defaultInCity);
    }
    var searcherCityName = $('#searchcity').val(); 
    if(searcherCityName == '城市'){
           var searcherCityName = ''; 
    }

    var newDate = new execCalendar('#startenddate',{abroad:isTrue,cityName:searcherCityName,timeZone:$('#timeZone').val()});
    $('#clearSelect').click();
    deleteCookie4Search('startDate','/','.xiaozhu.com');
    deleteCookie4Search('endDate','/','.xiaozhu.com');
})
$(document).click(function(ev){
    ev = ev || window.event || arguments.callee.caller.arguments[0];
    var target = ev.target || ev.srcElement;
    if (!/^(searchcity)|(cuspricetitle)|(price_custom)|(suggest)|(suggest_icon)|(hotcity)|(international_radios)|(radio_form)|(radio_lable_l)|(radio_lable_r)|(radio_r)|(radio_l)|(text-overseas)|(text-inland)|(radio_oversaes_real)|(radio_inland_real)|(a_d)|(e_j)|(k_n)|(p_w)|(x_z)|(abrd)$/.test(target.id) && !$(target).is("#con_one_1 *")) {
        $(".sug").hide();
        $("#suggest").hide();
        $("#cuspricediv").hide();
        if(($('#searchcity').attr('value') == '选择城市' || $('#searchcity').attr('value') == '') && !$('#suggest').is(':visible') && !$('.sug').is(':visible')) {
            $('#searchcity').attr('value',defaultCity);
        }
    }
    if (!/^(startenddate)|(calendar_btn_s)|(calendar-box)|(preMonth)|(nextMonth)|(clearSelect)$/.test(target.id) && !$(target).is("#calendar-box,#calendar-box *")) {
        if( $('#startdate').val() !='' && $("#enddate").val() == '') {
            endDateWarn($('#startenddate'));
        }
        else {
            if( $('#startdate').val() =='' && $("#enddate").val() == '') {
                $('#startenddate').val(defaultText);
            }
            $("#calendar-box").hide();
        }
    }
    if ( $(target).is(".ui-widget-overlay")) {
        closeDialog();
    }
});
document.onkeydown=function(event){
    var ev = event || window.event || arguments.callee.caller.arguments[0];
    if(ev && ev.keyCode == 27) {
        return closeDialog();
    }
}
$(window).load(function() {
    setInt = setTimeout("next_pic()",timeInterval);   
    $(".pics_pre").show();
    $(".pics_next").show();
    $("#searchcity").suggest('citys',{
        attachObject:'#suggest',
        dataContainer:'#selectcitydomain'
    });
    window.onresize=function(){  
        setBannerHeight();
    }  
    var indexCalendar = new execCalendar('#startenddate',{abroad:false}); 
    $('.indexdialogpic').click(function(){
        $("body").eq(0).css("overflow","hidden");
        var dialogId = $(this).attr('name') + "Dialog";
        if($(this).attr('name') == 'focusus'){
            $("#" + dialogId).dialog("option","width",616);
        }
        $("#" + dialogId).dialog("open").css({'width':''});
        var t = parseInt($('#'+dialogId).parent('.ui-dialog').css('top'));
        $('#'+dialogId).parent('.ui-dialog').css({'top': (t-60) +'px'});
        $('.ui-dialog-titlebar').hide();
    })
    $('.closeDialog').click(function(){
        return closeDialog();
    })

    XZWebAjax.get(XZWebUrlWriter.getAjax_GetCommentDiary4Index(),'',true, function(data){
        $('#commentdiary').html(data);
        $('.cmt_ul li').live('mouseover',function(){
            $(this).addClass('cmt_current');
            $(this).siblings().removeClass('cmt_current');
            var slide_index = $('.cmt_ul li').index($(this));
            var slide_show = $('.cmt_ul').siblings('div').eq(slide_index);
            slide_show.show();
            slide_show.siblings('div').hide();
            $(this).trigger('click');
        })
        var commentAndDiary = document.getElementsByClassName("cmt_con");
        var commentAndDiaryStartClientX = 0;
        var commentAndDiaryEndClientX = 0;
        var commentTouchStart = function(ev) {
                var touch = ev.touches[0];
                var changedTouches = ev.changedTouches;
                commentAndDiaryStartClientX = changedTouches[0].clientX;
            }
        var commentTouchEnd = function(ev) {
                var touch = ev.touches[0];
                var changedTouches = ev.changedTouches;
                commentAndDiaryEndClientX = changedTouches[0].clientX;
                var changeClientX = commentAndDiaryEndClientX - commentAndDiaryStartClientX;

                var slide_index = $(this).find('.cmt_ul li');
                var slide_length = slide_index.length - 1;
                var currentIndex = 0;
                if(changeClientX > 20) {
                    slide_index.each(function() {
                        if($(this).hasClass("cmt_current")) {
                            currentIndex = $(this).index();
                            slide_index.eq(currentIndex).removeClass('cmt_current');
                            if(currentIndex == 0) {
                                currentIndex = slide_length+1;
                            }
                            var slide_show = slide_index.parent().siblings('div').eq(currentIndex - 1);
                            slide_show.show();
                            slide_show.siblings('div').hide();
                        }
                    })
                    $(this).find('.cmt_ul li').siblings().eq(currentIndex - 1).addClass('cmt_current');
                } else if(changeClientX < -20){
                    slide_index.each(function() {
                        if($(this).hasClass("cmt_current")) {
                            currentIndex = $(this).index();
                            slide_index.eq(currentIndex).removeClass('cmt_current');
                            if(currentIndex == slide_length) {
                                currentIndex = -1;
                            }
                            var slide_show = slide_index.parent().siblings('div').eq(currentIndex + 1);
                            slide_show.show();
                            slide_show.siblings('div').hide();
                        }
                    })
                    $(this).find('.cmt_ul li').siblings().eq(currentIndex + 1).addClass('cmt_current');
                }
            }
        for(var i=0;i<commentAndDiary.length;i++) {
            commentAndDiary[i].removeEventListener('touchstart',commentTouchStart,false);
            commentAndDiary[i].removeEventListener('touchend',commentTouchEnd,false);
            commentAndDiary[i].addEventListener('touchstart',commentTouchStart,false);
            commentAndDiary[i].addEventListener('touchend',commentTouchEnd,false);
        }
    },'html');
    var obj = document;
    obj.addEventListener('touchstart', function(ev) {
        ev = ev || window.event || arguments.callee.caller.arguments[0];
        var target = ev.target || ev.srcElement;
        if (!/^(searchcity)|(cuspricetitle)|(price_custom)|(suggest_icon)|(hotcity)|(a_d)|(e_j)|(k_n)|(p_w)|(x_z)$/.test(target.id) && !$(target).is(".sug * ")) {
            $(".sug").hide();
            $("#cuspricediv").hide();
            if($('#searchcity').attr('value') == '' && !$('#suggest').is(':visible') && !$('.sug').is(':visible')) {
                $('#searchcity').attr('value',defaultCity);
                $('#searchcity').blur();
            }
        }
        if (!/^(startenddate)|(calendar_btn_s)|(calendar-box)|(preMonth)|(nextMonth)|(clearSelect)$/.test(target.id) && !$(target).is("#calendar-box,#calendar-box *")) {
            if( $('#startdate').val() !='' && $("#enddate").val() == '') {
                endDateWarn($('#startenddate'));
            }
            else {
                if( $('#startdate').val() =='' && $("#enddate").val() == '') {
                    $('#startenddate').val(defaultText);
                }
                $("#calendar-box").hide();
            }
        }
        if ( $(target).is(".ui-widget-overlay")) {
            closeDialog();
        }
    }, false);  

    var indeximage = document.getElementsByName("indeximage");
    var startClientX = 0;
    var endClientX = 0;

    var indexTouchStart = function(ev) {
            var touch = ev.touches[0];
            var changedTouches = ev.changedTouches;
            startClientX = changedTouches[0].clientX;
        }
    var indexTouchEnd = function(ev) {
            var touch = ev.touches[0];
            var changedTouches = ev.changedTouches;
            endClientX = changedTouches[0].clientX;
            var changeClientX = endClientX - startClientX;
            if(changeClientX > 50) {
                pre_pic();
            } else if(changeClientX < -50){
                next_pic();
            }
        }
    for(var i=0;i<indeximage.length;i++) {
        indeximage[i].removeEventListener('touchstart',indexTouchStart,false);
        indeximage[i].removeEventListener('touchend',indexTouchEnd,false);
        indeximage[i].addEventListener('touchstart',indexTouchStart,false);
        indeximage[i].addEventListener('touchend',indexTouchEnd,false);
    }
})
function pre_pic()
{
    var currentImage = $('.banner_img');
    var currentIndex = $('.banner_ul li').index($(currentImage));
    if(currentIndex > firstPic && currentIndex <= lastPic){
         currentIndex--;
    }
    else {
        currentIndex  = lastPic;
    }
    clearInterval(setInt);
    showLazyLoadImage(currentIndex);
    currentImage.removeClass('banner_img').fadeOut(fadeInOutTime);
    $('.banner_ul li').eq(currentIndex).addClass('banner_img').fadeIn(fadeInOutTime);
    setInt = setTimeout("next_pic()",timeInterval);   
} 
function next_pic()
{
    var currentImage = $('.banner_img');
    var currentIndex = $('.banner_ul li').index(currentImage);
    if(currentIndex >= firstPic && currentIndex < lastPic){
        currentIndex++;
    }
    else {
        currentIndex = firstPic;
    }
    showLazyLoadImage(currentIndex);
    clearInterval(setInt);
    currentImage.removeClass('banner_img').fadeOut(fadeInOutTime);
    $('.banner_ul li').eq(currentIndex).addClass('banner_img').fadeIn(fadeInOutTime);
    setInt = setTimeout("next_pic()",timeInterval);   
}
function setBannerHeight()
{
    var currentImgHeight = $('.banner_img').children('a').children('img').height();
    if (currentImgHeight && currentImgHeight > 0) {
        $('div .banner').css('height',currentImgHeight+'px');
    }
}
function closeDialog()
{
    if($('.login_register_box:visible').length){
        return; 
    }
    $("body").eq(0).css("overflow","scroll");
    $('.ui-icon-closethick').click();
    return false;
}
function endDateWarn (inputObj)
{
    var i = 0,t=false,v=inputObj.val();
    if( (v == '') || t) return ;
    t= setInterval(function(){
        if($('#startdate').val() == '' || $("#enddate").val() != '') { clearInterval(t); return ;}
        i++;
        if(i%2) { inputObj.val(''); }
        else { inputObj.val(v); }
        if(i== 6){ clearInterval(t); }
    },600);
}
function showLazyLoadImage(imgIndex)
{
    for(var i=0;i<3;i++) {
        if( (imgIndex + i) > lastPic) {
            return ;
        }
        var obj = $('.banner_ul li').eq(imgIndex+i).children('a').children('img');

        if(typeof(obj.attr('src')) == 'undefined') {
            obj.attr('src',obj.attr('lazyloadsrc'));
            obj.removeAttr('lazyloadsrc');
        }
    }
}

function closeWidgetPop(){
    $('#firstOrderReducePop').hide();
    setCookie('hidePop2Hours','1',0.08);//修改时间第三个参数 单位是天
}

function closeWidgetActivityPop(){
    $('#activityPopBottom').hide();
    return false;
}
 
 
$(function () {

    var oLA = $(".city_list_left>li>a");//左边的城市集合
    var oRA = $(".city_list_right>li>a");//右边的字母集合
    var oLS = $(".city_list_left>li>span");//左边的字母集合

    /*  点击事件：选择城市  */
    oLA.each(function (index, ele) {
        var cName = $(this).attr("data-en")[0].toUpperCase();
        var eq = index;
        $(this).click(function () {
            // hot change , eq = hot city number - 1
            if (eq <= 7) {
                $("#hot").css("background-position", "0 0");
            } else if (eq > 7) {
                $("#hot").css("background-position", "0 -15px");
            }

            for (var i = 0; i < oLA.length; i++) {
                oLA[i].className = "";
            }
            oRA.each(function () {
                $(this).removeClass();
            });
            $(this).addClass("active");

            /*   选择关闭  */
            $(".city_wrap i").html($(this).find("span").html());
            $(".city_list").hide();
            $("#invite_city_list").attr("class", "region_spread");
            stack = !stack;

            $('#' + cName + '').attr("class", "active");
            var enName = $(this).attr('data-en');
            var flagName = (enName == 'HongKong' || enName == 'Macau' || enName == 'TaiWan') ? 'China' : enName.replace(/\s+/g, "_");
            if (enName == 'Ascension' || enName == 'French Guiana' || enName == 'Reunion') {
                $("#invite_country_box img").remove();
            } else {
                if (!$("#invite_country_box i").prev().is("img")) {
                    $("#invite_country_box i").before("<img>");
                }
                $("#invite_country_box img").attr('src', '/images/flag/' + flagName + ".jpg");
            }
            $('#invite_country').attr('countrycode', $(this).attr('data-code')).attr('countryname', $(this).attr('data-shortname')).attr('countryflag', flagName).text('+' + $(this).attr('data-code'));
        })
    });
    /*  点击事件：选择字母  */
    oRA.each(function (index, ele) {
        var oId = this.id;  //当前ID
        var eq = index;
        $(this).click(function () {
            if (eq == 0) {
                $("#hot").css("background-position", "0 0");
                $('.city_list').scrollTop(0);
                oRA.each(function () {
                    $(this).removeClass();
                })
            } else if (eq != 0) {
                $("#hot").css("background-position", "0 -15px");
                for (var i = 0; i < oLA.length; i++) {
                    var LName = oLA[i].getAttribute("data-en")[0].toUpperCase();
                    if (LName == oId) {
                        var sNum = oLA[i].offsetTop - 143;
                        $('.city_list').scrollTop(sNum);
                        return;
                    }
                }
            }
        });
    });
    /*  滚动事件：城市选框  */
    $(".city_list").scroll(function () {
        var top = this.scrollTop + 10 + "px";
        $(".city_list_right").css("top", top);
        if (this.scrollTop > 150) {
            $("#hot").css("background-position", "0 -15px");
            for (var i = 0; i < oLS.length; i++) {
                var Otop = oLS[i].offsetTop - this.scrollTop;
                var tName = oLS[i].innerHTML;

                if (Otop <= 150) {
                    oRA.each(function () {
                        $(this).removeClass();
                    });

                    $('#' + tName + '').attr("class", "active");
                }
            }
        } else {
            $("#hot").css("background-position", "0 0");
            oRA.each(function () {
                $(this).removeClass();
            });
        }

    });
    /*点击事件：展开&收缩*/
    var stack = false;
    $("#invite_country_box").click(function () {
        if (stack) {
            $(".city_list").hide();
            $("#invite_city_list").attr("class", "city_list_spread");
            stack = !stack;
        } else {
            $(".city_list").show();
            $("#invite_city_list").attr("class", "city_list_shrink");
            stack = !stack;
        }
    });
    $('#goregister').on('click', function () {
        var url = [];
        var defaultNationCode = '86';
        var phone = $('#invitePhone').val();
        var directUrl = $('#inviteRegisterUrl').val()
        if (phone) {
            url.push('regphone=' + phone);
            if (defaultNationCode != $('#invite_country').attr('countrycode')) {
                url.push('countryname=' + $('#invite_country').attr('countryname'));
                url.push('countrycode=' + $('#invite_country').attr('countrycode'));
                url.push('countryflag=' + $('#invite_country').attr('countryflag'));
            }
            directUrl = directUrl + '&' + url.join('&');
        }
        window.location = directUrl;
    });
    $('#closeShareInvite').on('click',function(){
        $('#shareInvitePop').hide();
    });

});


 
 function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
};
function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
};
function regAct(){
    if(getUrlParms('utm_content')=='sem') {
        if (getCookie('xzuinfo')) {
            var downloadhtml = '<div class="download_wrap" style="position:fixed;bottom:0;width:100%;height:170px;text-allign:center;z-index:120;cursor:pointer">'
                + '<img src="/images/close.png"  class="reg_close" style="position:absolute;left:50%;margin-left:420px;top:5%;z-index:140;cursor:pointer"/>'
                + '<img src="/images/downloadbanner.png"  class="download_main" style="height:170px;position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1920px;z-index:130;cursor:pointer"/>'
                + '</div>'
                + '<img src="/images/downloadopen.png"  class="download_open" style="height:170px;position:fixed;bottom:0;left:-54px;z-index:150;cursor:pointer"/>';
            $('body').append(downloadhtml);
            $('.reg_close').on('click', function () {
                $('.download_wrap').animate({right: '1920px'}, 500);
                setTimeout(function () {
                    $('.download_open').animate({left: '0px'}, 200)
                }, 400)
            });
            $('.download_main').on('click', function () {
                window.location = 'https://s.growingio.com/XbLjzr';
            });
            $('.download_open').on('click', function () {
                $('.download_open').animate({left: '-54px'}, 200);
                $('.download_wrap').animate({right: '0px'}, 500);
            });
        } else {
            var reghtml = '<div class="reg_wrap" style="position:fixed;bottom:0;width:100%;height:170px;text-allign:center;z-index:120;cursor:pointer">'
                + '<img src="/images/close.png"  class="reg_close" style="position:absolute;left:50%;margin-left:420px;top:5%;z-index:140;cursor:pointer"/>'
                + '<img src="/images/regbanner.png"  class="reg_main" style="height:170px;position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1920px;z-index:130;cursor:pointer"/>'
                + '</div>'
                + '<img src="/images/open.png"  class="reg_open" style="height:170px;position:fixed;bottom:0;left:-54px;z-index:150;cursor:pointer"/>';
            $('body').append(reghtml);
            $('.reg_close').on('click', function () {
                $('.reg_wrap').animate({right: '1920px'}, 500);
                setTimeout(function () {
                    $('.reg_open').animate({left: '0px'}, 200)
                }, 400)
            });
            $('.reg_main').on('click', function () {
                $('.show-register-box')[0].click();
                $('.reg_wrap').animate({right: '1920px'}, 500);
                $('.reg_open').animate({left: '0px'}, 200);
            });
            $('.reg_open').on('click', function () {
                $('.reg_open').animate({left: '-54px'}, 200);
                $('.reg_wrap').animate({right: '0px'}, 500);
            });
        }
    }
};
regAct();
