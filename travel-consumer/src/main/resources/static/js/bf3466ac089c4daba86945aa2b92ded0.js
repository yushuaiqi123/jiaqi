 
 var topLevelDomain = "xiaozhu.com";
var domain = "xa.xiaozhu.com";
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
 
 /*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
 
 /*! jQuery UI - v1.10.3 - 2013-10-20
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */

(function(e,t){function i(t,i){var s,n,r,o=t.nodeName.toLowerCase();return"area"===o?(s=t.parentNode,n=s.name,t.href&&n&&"map"===s.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&a(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&a(t)}function a(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var s=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,a){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),a&&a.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var a,s,n=e(this[0]);n.length&&n[0]!==document;){if(a=n.css("position"),("absolute"===a||"relative"===a||"fixed"===a)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,a){return!!e.data(t,a[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var a=e.attr(t,"tabindex"),s=isNaN(a);return(s||a>=0)&&i(t,!s)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,a){function s(t,i,a,s){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,a&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===a?["Left","Right"]:["Top","Bottom"],r=a.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+a]=function(i){return i===t?o["inner"+a].call(this):this.each(function(){e(this).css(r,s(this,i)+"px")})},e.fn["outer"+a]=function(t,i){return"number"!=typeof t?o["outer"+a].call(this,t):this.each(function(){e(this).css(r,s(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,a){var s,n=e.ui[t].prototype;for(s in a)n.plugins[s]=n.plugins[s]||[],n.plugins[s].push([i,a[s]])},call:function(e,t,i){var a,s=e.plugins[t];if(s&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(a=0;s.length>a;a++)e.options[s[a][0]]&&s[a][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var a=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return t[a]>0?!0:(t[a]=1,s=t[a]>0,t[a]=0,s)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,a=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(n){}a(t)},e.widget=function(i,s,a){var n,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],n=u+"-"+i,a||(a=s,s=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:a.version,_proto:e.extend({},a),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(a,function(i,a){return e.isFunction(a)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,n=this._superApply;return this._super=e,this._superApply=t,i=a.apply(this,arguments),this._super=s,this._superApply=n,i}}(),t):(l[i]=a,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:n}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var a,n,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(a in r[o])n=r[o][a],r[o].hasOwnProperty(a)&&n!==t&&(i[a]=e.isPlainObject(n)?e.isPlainObject(i[a])?e.widget.extend({},i[a],n):e.widget.extend({},n):n);return i},e.widget.bridge=function(i,a){var n=a.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,a=e.data(this,n);return a?e.isFunction(a[r])&&"_"!==r.charAt(0)?(s=a[r].apply(a,h),s!==a&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,n);t?t.option(r||{})._init():e.data(this,n,new a(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var a,n,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},a=i.split("."),i=a.shift(),a.length){for(n=o[i]=e.widget.extend({},this.options[i]),r=0;a.length-1>r;r++)n[a[r]]=n[a[r]]||{},n=n[a[r]];if(i=a.pop(),s===t)return n[i]===t?null:n[i];n[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,a){var n,r=this;"boolean"!=typeof i&&(a=s,s=i,i=!1),a?(s=n=e(s),this.bindings=this.bindings.add(s)):(a=s,s=this.element,n=this.widget()),e.each(a,function(a,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=a.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?n.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var a,n,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],n=i.originalEvent)for(a in n)a in i||(i[a]=n[a]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,a,n){"string"==typeof a&&(a={effect:a});var r,o=a?a===!0||"number"==typeof a?i:a.effect||i:t;a=a||{},"number"==typeof a&&(a={duration:a}),r=!e.isEmptyObject(a),a.complete=n,a.delay&&s.delay(a.delay),r&&e.effects&&e.effects.effect[o]?s[t](a):o!==t&&s[o]?s[o](a.duration,a.easing,n):s.queue(function(i){e(this)[t](),n&&n.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,a=1===i.which,n="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return a&&!n&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(e,t){function i(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function s(t,i){return parseInt(e.css(t,i),10)||0}function a(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,r=Math.max,o=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,c=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var i,s,a=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),r=a.children()[0];return e("body").append(a),i=r.offsetWidth,a.css("overflow","scroll"),s=r.offsetWidth,i===s&&(s=a[0].clientWidth),a.remove(),n=i-s},getScrollInfo:function(t){var i=t.isWindow?"":t.element.css("overflow-x"),s=t.isWindow?"":t.element.css("overflow-y"),a="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,n="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:n?e.position.scrollbarWidth():0,height:a?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return f.apply(this,arguments);t=e.extend({},t);var n,p,m,g,v,y,b=e(t.of),_=e.position.getWithinInfo(t.within),x=e.position.getScrollInfo(_),k=(t.collision||"flip").split(" "),w={};return y=a(b),b[0].preventDefault&&(t.at="left top"),p=y.width,m=y.height,g=y.offset,v=e.extend({},g),e.each(["my","at"],function(){var e,i,s=(t[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):u.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=u.test(s[1])?s[1]:"center",e=c.exec(s[0]),i=c.exec(s[1]),w[this]=[e?e[0]:0,i?i[0]:0],t[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===t.at[0]?v.left+=p:"center"===t.at[0]&&(v.left+=p/2),"bottom"===t.at[1]?v.top+=m:"center"===t.at[1]&&(v.top+=m/2),n=i(w.at,p,m),v.left+=n[0],v.top+=n[1],this.each(function(){var a,l,u=e(this),c=u.outerWidth(),d=u.outerHeight(),f=s(this,"marginLeft"),y=s(this,"marginTop"),D=c+f+s(this,"marginRight")+x.width,T=d+y+s(this,"marginBottom")+x.height,M=e.extend({},v),S=i(w.my,u.outerWidth(),u.outerHeight());"right"===t.my[0]?M.left-=c:"center"===t.my[0]&&(M.left-=c/2),"bottom"===t.my[1]?M.top-=d:"center"===t.my[1]&&(M.top-=d/2),M.left+=S[0],M.top+=S[1],e.support.offsetFractions||(M.left=h(M.left),M.top=h(M.top)),a={marginLeft:f,marginTop:y},e.each(["left","top"],function(i,s){e.ui.position[k[i]]&&e.ui.position[k[i]][s](M,{targetWidth:p,targetHeight:m,elemWidth:c,elemHeight:d,collisionPosition:a,collisionWidth:D,collisionHeight:T,offset:[n[0]+S[0],n[1]+S[1]],my:t.my,at:t.at,within:_,elem:u})}),t.using&&(l=function(e){var i=g.left-M.left,s=i+p-c,a=g.top-M.top,n=a+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:u,left:M.left,top:M.top,width:c,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>n?"top":a>0?"bottom":"middle"};c>p&&p>o(i+s)&&(h.horizontal="center"),d>m&&m>o(a+n)&&(h.vertical="middle"),h.important=r(o(i),o(s))>r(o(a),o(n))?"horizontal":"vertical",t.using.call(this,e,h)}),u.offset(e.extend(M,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,a=s.isWindow?s.scrollLeft:s.offset.left,n=s.width,o=e.left-t.collisionPosition.marginLeft,h=a-o,l=o+t.collisionWidth-n-a;t.collisionWidth>n?h>0&&0>=l?(i=e.left+h+t.collisionWidth-n-a,e.left+=h-i):e.left=l>0&&0>=h?a:h>l?a+n-t.collisionWidth:a:h>0?e.left+=h:l>0?e.left-=l:e.left=r(e.left-o,e.left)},top:function(e,t){var i,s=t.within,a=s.isWindow?s.scrollTop:s.offset.top,n=t.within.height,o=e.top-t.collisionPosition.marginTop,h=a-o,l=o+t.collisionHeight-n-a;t.collisionHeight>n?h>0&&0>=l?(i=e.top+h+t.collisionHeight-n-a,e.top+=h-i):e.top=l>0&&0>=h?a:h>l?a+n-t.collisionHeight:a:h>0?e.top+=h:l>0?e.top-=l:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var i,s,a=t.within,n=a.offset.left+a.scrollLeft,r=a.width,h=a.isWindow?a.scrollLeft:a.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,c=l+t.collisionWidth-r-h,d="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+d+p+f+t.collisionWidth-r-n,(0>i||o(u)>i)&&(e.left+=d+p+f)):c>0&&(s=e.left-t.collisionPosition.marginLeft+d+p+f-h,(s>0||c>o(s))&&(e.left+=d+p+f))},top:function(e,t){var i,s,a=t.within,n=a.offset.top+a.scrollTop,r=a.height,h=a.isWindow?a.scrollTop:a.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,c=l+t.collisionHeight-r-h,d="top"===t.my[1],p=d?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-r-n,e.top+p+f+m>u&&(0>s||o(u)>s)&&(e.top+=p+f+m)):c>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,e.top+p+f+m>c&&(i>0||c>o(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,a,n,r=document.getElementsByTagName("body")[0],o=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(n in s)t.style[n]=s[n];t.appendChild(o),i=r||document.documentElement,i.insertBefore(t,i.firstChild),o.style.cssText="position: absolute; left: 10.7432222px;",a=e(o).offset().left,e.support.offsetFractions=a>10&&11>a,t.innerHTML="",i.removeChild(t)}()})(jQuery);(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var a=this._uiHash();if(this._trigger("drag",t,a)===!1)return this._mouseUp({}),!1;this.position=a.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,a=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(a=e.ui.ddmanager.drop(this,t)),this.dropped&&(a=this.dropped,this.dropped=!1),"original"!==this.options.helper||e.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!a||"valid"===this.options.revert&&a||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,a)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var i=this.options,a=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return a.parents("body").length||a.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),a[0]===this.element[0]||/(fixed|absolute)/.test(a.css("position"))||a.css("position","absolute"),a},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,a,s=this.options;return s.containment?"window"===s.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):"document"===s.containment?(this.containment=[0,0,e(document).width()-this.helperProportions.width-this.margins.left,(e(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):s.containment.constructor===Array?(this.containment=s.containment,undefined):("parent"===s.containment&&(s.containment=this.helper[0].parentNode),i=e(s.containment),a=i[0],a&&(t="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(a.scrollWidth,a.offsetWidth):a.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(a.scrollHeight,a.offsetHeight):a.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i),undefined):(this.containment=null,undefined)},_convertPositionTo:function(t,i){i||(i=this.position);var a="absolute"===t?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:s.scrollTop(),left:s.scrollLeft()}),{top:i.top+this.offset.relative.top*a+this.offset.parent.top*a-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*a,left:i.left+this.offset.relative.left*a+this.offset.parent.left*a-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*a}},_generatePosition:function(t){var i,a,s,n,r=this.options,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=t.pageX,h=t.pageY;return this.offset.scroll||(this.offset.scroll={top:o.scrollTop(),left:o.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(a=this.relative_container.offset(),i=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),r.grid&&(s=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,h=i?s-this.offset.click.top>=i[1]||s-this.offset.click.top>i[3]?s:s-this.offset.click.top>=i[1]?s-r.grid[1]:s+r.grid[1]:s,n=r.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,l=i?n-this.offset.click.left>=i[0]||n-this.offset.click.left>i[2]?n:n-this.offset.click.left>=i[0]?n-r.grid[0]:n+r.grid[0]:n)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,a){return a=a||this._uiHash(),e.ui.plugin.call(this,t,[i,a]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,a)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var a=e(this).data("ui-draggable"),s=a.options,n=e.extend({},i,{item:a.element});a.sortables=[],e(s.connectToSortable).each(function(){var i=e.data(this,"ui-sortable");i&&!i.options.disabled&&(a.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i){var a=e(this).data("ui-draggable"),s=e.extend({},i,{item:a.element});e.each(a.sortables,function(){this.instance.isOver?(this.instance.isOver=0,a.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===a.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,s))})},drag:function(t,i){var a=e(this).data("ui-draggable"),s=this;e.each(a.sortables,function(){var n=!1,r=this;this.instance.positionAbs=a.positionAbs,this.instance.helperProportions=a.helperProportions,this.instance.offset.click=a.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,e.each(a.sortables,function(){return this.instance.positionAbs=a.positionAbs,this.instance.helperProportions=a.helperProportions,this.instance.offset.click=a.offset.click,this!==r&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(r.instance.element[0],this.instance.element[0])&&(n=!1),n})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=a.offset.click.top,this.instance.offset.click.left=a.offset.click.left,this.instance.offset.parent.left-=a.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=a.offset.parent.top-this.instance.offset.parent.top,a._trigger("toSortable",t),a.dropped=this.instance.element,a.currentItem=a.element,this.instance.fromOutside=a),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),a._trigger("fromSortable",t),a.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("ui-draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var a=e(i.helper),s=e(this).data("ui-draggable").options;a.css("opacity")&&(s._opacity=a.css("opacity")),a.css("opacity",s.opacity)},stop:function(t,i){var a=e(this).data("ui-draggable").options;a._opacity&&e(i.helper).css("opacity",a._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("ui-draggable"),a=i.options,s=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(a.axis&&"x"===a.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<a.scrollSensitivity?i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop+a.scrollSpeed:t.pageY-i.overflowOffset.top<a.scrollSensitivity&&(i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop-a.scrollSpeed)),a.axis&&"y"===a.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<a.scrollSensitivity?i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft+a.scrollSpeed:t.pageX-i.overflowOffset.left<a.scrollSensitivity&&(i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft-a.scrollSpeed))):(a.axis&&"x"===a.axis||(t.pageY-e(document).scrollTop()<a.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-a.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<a.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+a.scrollSpeed))),a.axis&&"y"===a.axis||(t.pageX-e(document).scrollLeft()<a.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-a.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<a.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+a.scrollSpeed)))),s!==!1&&e.ui.ddmanager&&!a.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=e(this),a=i.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:a.top,left:a.left})})},drag:function(t,i){var a,s,n,r,o,l,h,u,d,c,p=e(this).data("ui-draggable"),f=p.options,m=f.snapTolerance,g=i.offset.left,v=g+p.helperProportions.width,y=i.offset.top,b=y+p.helperProportions.height;for(d=p.snapElements.length-1;d>=0;d--)o=p.snapElements[d].left,l=o+p.snapElements[d].width,h=p.snapElements[d].top,u=h+p.snapElements[d].height,o-m>v||g>l+m||h-m>b||y>u+m||!e.contains(p.snapElements[d].item.ownerDocument,p.snapElements[d].item)?(p.snapElements[d].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[d].item})),p.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(a=m>=Math.abs(h-b),s=m>=Math.abs(u-y),n=m>=Math.abs(o-v),r=m>=Math.abs(l-g),a&&(i.position.top=p._convertPositionTo("relative",{top:h-p.helperProportions.height,left:0}).top-p.margins.top),s&&(i.position.top=p._convertPositionTo("relative",{top:u,left:0}).top-p.margins.top),n&&(i.position.left=p._convertPositionTo("relative",{top:0,left:o-p.helperProportions.width}).left-p.margins.left),r&&(i.position.left=p._convertPositionTo("relative",{top:0,left:l}).left-p.margins.left)),c=a||s||n||r,"outer"!==f.snapMode&&(a=m>=Math.abs(h-y),s=m>=Math.abs(u-b),n=m>=Math.abs(o-g),r=m>=Math.abs(l-v),a&&(i.position.top=p._convertPositionTo("relative",{top:h,left:0}).top-p.margins.top),s&&(i.position.top=p._convertPositionTo("relative",{top:u-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.left=p._convertPositionTo("relative",{top:0,left:o}).left-p.margins.left),r&&(i.position.left=p._convertPositionTo("relative",{top:0,left:l-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[d].snapping&&(a||s||n||r||c)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[d].item})),p.snapElements[d].snapping=a||s||n||r||c)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,i=this.data("ui-draggable").options,a=e.makeArray(e(i.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});a.length&&(t=parseInt(e(a[0]).css("zIndex"),10)||0,e(a).each(function(i){e(this).css("zIndex",t+i)}),this.css("zIndex",t+a.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var a=e(i.helper),s=e(this).data("ui-draggable").options;a.css("zIndex")&&(s._zIndex=a.css("zIndex")),a.css("zIndex",s.zIndex)},stop:function(t,i){var a=e(this).data("ui-draggable").options;a._zIndex&&e(i.helper).css("zIndex",a._zIndex)}})})(jQuery);(function(e){function t(e,t,i){return e>t&&t+i>e}e.widget("ui.droppable",{version:"1.10.3",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t=this.options,i=t.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(i)?i:function(e){return e.is(i)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var t=0,i=e.ui.ddmanager.droppables[this.options.scope];i.length>t;t++)i[t]===this&&i.splice(t,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){"accept"===t&&(this.accept=e.isFunction(i)?i:function(e){return e.is(i)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var a=i||e.ui.ddmanager.current,s=!1;return a&&(a.currentItem||a.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"ui-droppable");return t.options.greedy&&!t.options.disabled&&t.options.scope===a.options.scope&&t.accept.call(t.element[0],a.currentItem||a.element)&&e.ui.intersect(a,e.extend(t,{offset:t.element.offset()}),t.options.tolerance)?(s=!0,!1):undefined}),s?!1:this.accept.call(this.element[0],a.currentItem||a.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(a)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(e,i,a){if(!i.offset)return!1;var s,n,r=(e.positionAbs||e.position.absolute).left,o=r+e.helperProportions.width,l=(e.positionAbs||e.position.absolute).top,h=l+e.helperProportions.height,u=i.offset.left,d=u+i.proportions.width,c=i.offset.top,p=c+i.proportions.height;switch(a){case"fit":return r>=u&&d>=o&&l>=c&&p>=h;case"intersect":return r+e.helperProportions.width/2>u&&d>o-e.helperProportions.width/2&&l+e.helperProportions.height/2>c&&p>h-e.helperProportions.height/2;case"pointer":return s=(e.positionAbs||e.position.absolute).left+(e.clickOffset||e.offset.click).left,n=(e.positionAbs||e.position.absolute).top+(e.clickOffset||e.offset.click).top,t(n,c,i.proportions.height)&&t(s,u,i.proportions.width);case"touch":return(l>=c&&p>=l||h>=c&&p>=h||c>l&&h>p)&&(r>=u&&d>=r||o>=u&&d>=o||u>r&&o>d);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var a,s,n=e.ui.ddmanager.droppables[t.options.scope]||[],r=i?i.type:null,o=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(a=0;n.length>a;a++)if(!(n[a].options.disabled||t&&!n[a].accept.call(n[a].element[0],t.currentItem||t.element))){for(s=0;o.length>s;s++)if(o[s]===n[a].element[0]){n[a].proportions.height=0;continue e}n[a].visible="none"!==n[a].element.css("display"),n[a].visible&&("mousedown"===r&&n[a]._activate.call(n[a],i),n[a].offset=n[a].element.offset(),n[a].proportions={width:n[a].element[0].offsetWidth,height:n[a].element[0].offsetHeight})}},drop:function(t,i){var a=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(a=this._drop.call(this,i)||a),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),a},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var a,s,n,r=e.ui.intersect(t,this,this.options.tolerance),o=!r&&this.isover?"isout":r&&!this.isover?"isover":null;o&&(this.options.greedy&&(s=this.options.scope,n=this.element.parents(":data(ui-droppable)").filter(function(){return e.data(this,"ui-droppable").options.scope===s}),n.length&&(a=e.data(n[0],"ui-droppable"),a.greedyChild="isover"===o)),a&&"isover"===o&&(a.isover=!1,a.isout=!0,a._out.call(a,i)),this[o]=!0,this["isout"===o?"isover":"isout"]=!1,this["isover"===o?"_over":"_out"].call(this,i),a&&"isout"===o&&(a.isout=!1,a.isover=!0,a._over.call(a,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}}})(jQuery);(function(e){function t(e){return parseInt(e,10)||0}function i(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,s,a,n,r=this,o=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!o.aspectRatio,aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper||o.ghost||o.animate?o.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=o.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),n="ui-resizable-"+s,a=e("<div class='ui-resizable-handle "+n+"'></div>"),a.css({zIndex:o.zIndex}),"se"===s&&a.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(a);this._renderAxis=function(t){var i,s,a,n;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),n=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),a=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(a,n),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){r.resizing||(this.className&&(a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=a&&a[1]?a[1]:"se")}),o.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){o.disabled||(e(this).removeClass("ui-resizable-autohide"),r._handles.show())}).mouseleave(function(){o.disabled||r.resizing||(e(this).addClass("ui-resizable-autohide"),r._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,a=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(a=!0);return!this.options.disabled&&a},_mouseStart:function(i){var s,a,n,r=this.options,o=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:o.top,left:o.left}),this._renderProxy(),s=t(this.helper.css("left")),a=t(this.helper.css("top")),r.containment&&(s+=e(r.containment).scrollLeft()||0,a+=e(r.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:a},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:a},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof r.aspectRatio?r.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(t){var i,s=this.helper,a={},n=this.originalMousePosition,r=this.axis,o=this.position.top,h=this.position.left,l=this.size.width,u=this.size.height,c=t.pageX-n.left||0,d=t.pageY-n.top||0,p=this._change[r];return p?(i=p.apply(this,[t,c,d]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),this.position.top!==o&&(a.top=this.position.top+"px"),this.position.left!==h&&(a.left=this.position.left+"px"),this.size.width!==l&&(a.width=this.size.width+"px"),this.size.height!==u&&(a.height=this.size.height+"px"),s.css(a),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(a)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,a,n,r,o,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),a=s&&e.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,n=s?0:u.sizeDiff.width,r={width:u.helper.width()-n,height:u.helper.height()-a},o=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(r,{top:h,left:o})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,a,n,r,o=this.options;r={minWidth:i(o.minWidth)?o.minWidth:0,maxWidth:i(o.maxWidth)?o.maxWidth:1/0,minHeight:i(o.minHeight)?o.minHeight:0,maxHeight:i(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=r.minHeight*this.aspectRatio,a=r.minWidth/this.aspectRatio,s=r.maxHeight*this.aspectRatio,n=r.maxWidth/this.aspectRatio,t>r.minWidth&&(r.minWidth=t),a>r.minHeight&&(r.minHeight=a),r.maxWidth>s&&(r.maxWidth=s),r.maxHeight>n&&(r.maxHeight=n)),this._vBoundaries=r},_updateCache:function(e){this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,s=this.size,a=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===a&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"===a&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,s=this.axis,a=i(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=i(e.height)&&t.maxHeight&&t.maxHeight<e.height,r=i(e.width)&&t.minWidth&&t.minWidth>e.width,o=i(e.height)&&t.minHeight&&t.minHeight>e.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(s),c=/nw|ne|n/.test(s);return r&&(e.width=t.minWidth),o&&(e.height=t.minHeight),a&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),r&&u&&(e.left=h-t.minWidth),a&&u&&(e.left=h-t.maxWidth),o&&c&&(e.top=l-t.minHeight),n&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,i,s,a,n=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(a=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],i=[a.css("borderTopWidth"),a.css("borderRightWidth"),a.css("borderBottomWidth"),a.css("borderLeftWidth")],s=[a.css("paddingTop"),a.css("paddingRight"),a.css("paddingBottom"),a.css("paddingLeft")],t=0;i.length>t;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(s[t],10)||0);a.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,a=this.originalPosition;return{top:a.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("ui-resizable"),s=i.options,a=i._proportionallyResizeElements,n=a.length&&/textarea/i.test(a[0].nodeName),r=n&&e.ui.hasScroll(a[0],"left")?0:i.sizeDiff.height,o=n?0:i.sizeDiff.width,h={width:i.size.width-o,height:i.size.height-r},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};a&&a.length&&e(a[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i,s,a,n,r,o,h,l=e(this).data("ui-resizable"),u=l.options,c=l.element,d=u.containment,p=d instanceof e?d.get(0):/parent/.test(d)?c.parent().get(0):d;p&&(l.containerElement=e(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(i=e(p),s=[],e(["Top","Right","Left","Bottom"]).each(function(e,a){s[e]=t(i.css("padding"+a))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},a=l.containerOffset,n=l.containerSize.height,r=l.containerSize.width,o=e.ui.hasScroll(p,"left")?p.scrollWidth:r,h=e.ui.hasScroll(p)?p.scrollHeight:n,l.parentData={element:p,left:a.left,top:a.top,width:o,height:h}))},resize:function(t){var i,s,a,n,r=e(this).data("ui-resizable"),o=r.options,h=r.containerOffset,l=r.position,u=r._aspectRatio||t.shiftKey,c={top:0,left:0},d=r.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(r._helper?h.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-h.left:r.position.left-c.left),u&&(r.size.height=r.size.width/r.aspectRatio),r.position.left=o.helper?h.left:0),l.top<(r._helper?h.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-h.top:r.position.top),u&&(r.size.width=r.size.height*r.aspectRatio),r.position.top=r._helper?h.top:0),r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top,i=Math.abs((r._helper?r.offset.left-c.left:r.offset.left-c.left)+r.sizeDiff.width),s=Math.abs((r._helper?r.offset.top-c.top:r.offset.top-h.top)+r.sizeDiff.height),a=r.containerElement.get(0)===r.element.parent().get(0),n=/relative|absolute/.test(r.containerElement.css("position")),a&&n&&(i-=r.parentData.left),i+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-i,u&&(r.size.height=r.size.width/r.aspectRatio)),s+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-s,u&&(r.size.width=r.size.height*r.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.containerOffset,a=t.containerPosition,n=t.containerElement,r=e(t.helper),o=r.offset(),h=r.outerWidth()-t.sizeDiff.width,l=r.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("ui-resizable"),a=s.options,n=s.originalSize,r=s.originalPosition,o={height:s.size.height-n.height||0,width:s.size.width-n.width||0,top:s.position.top-r.top||0,left:s.position.left-r.left||0},h=function(t,s){e(t).each(function(){var t=e(this),a=e(this).data("ui-resizable-alsoresize"),n={},r=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(e,t){var i=(a[t]||0)+(o[t]||0);i&&i>=0&&(n[t]=i||null)}),t.css(n)})};"object"!=typeof a.alsoResize||a.alsoResize.nodeType?h(a.alsoResize):e.each(a.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size,a=t.originalSize,n=t.originalPosition,r=t.axis,o="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=o[0]||1,l=o[1]||1,u=Math.round((s.width-a.width)/h)*h,c=Math.round((s.height-a.height)/l)*l,d=a.width+u,p=a.height+c,f=i.maxWidth&&d>i.maxWidth,m=i.maxHeight&&p>i.maxHeight,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=o,g&&(d+=h),v&&(p+=l),f&&(d-=h),m&&(p-=l),/^(se|s|e)$/.test(r)?(t.size.width=d,t.size.height=p):/^(ne)$/.test(r)?(t.size.width=d,t.size.height=p,t.position.top=n.top-c):/^(sw)$/.test(r)?(t.size.width=d,t.size.height=p,t.position.left=n.left-u):(t.size.width=d,t.size.height=p,t.position.top=n.top-c,t.position.left=n.left-u)}})})(jQuery);(function(e){e.widget("ui.selectable",e.ui.mouse,{version:"1.10.3",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,a=e.data(this,"selectable-item");return a?(s=!t.metaKey&&!t.ctrlKey||!a.$element.hasClass("ui-selected"),a.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),a.unselecting=!s,a.selecting=s,a.selected=s,s?i._trigger("selecting",t,{selecting:a.element}):i._trigger("unselecting",t,{unselecting:a.element}),!1):undefined}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,a=this.options,n=this.opos[0],r=this.opos[1],o=t.pageX,h=t.pageY;return n>o&&(i=o,o=n,n=i),r>h&&(i=h,h=r,r=i),this.helper.css({left:n,top:r,width:o-n,height:h-r}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===a.tolerance?l=!(i.left>o||n>i.right||i.top>h||r>i.bottom):"fit"===a.tolerance&&(l=i.left>n&&o>i.right&&i.top>r&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}})})(jQuery);(function(e){function t(e,t,i){return e>t&&t+i>e}function i(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))}e.widget("ui.sortable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,i){"disabled"===t?(this.options[t]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,i){var s=null,a=!1,n=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,n.widgetName+"-item")===n?(s=e(this),!1):undefined}),e.data(t.target,n.widgetName+"-item")===n&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(a=!0)}),a)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var a,n,r=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(n=this.document.find("body"),this.storedCursor=n.css("cursor"),n.css("cursor",r.cursor),this.storedStylesheet=e("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(n)),r.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(a=this.containers.length-1;a>=0;a--)this.containers[a]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,a,n,r=this.options,o=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop+r.scrollSpeed:t.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft+r.scrollSpeed:t.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(t.pageY-e(document).scrollTop()<r.scrollSensitivity?o=e(document).scrollTop(e(document).scrollTop()-r.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<r.scrollSensitivity&&(o=e(document).scrollTop(e(document).scrollTop()+r.scrollSpeed)),t.pageX-e(document).scrollLeft()<r.scrollSensitivity?o=e(document).scrollLeft(e(document).scrollLeft()-r.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<r.scrollSensitivity&&(o=e(document).scrollLeft(e(document).scrollLeft()+r.scrollSpeed))),o!==!1&&e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],a=s.item[0],n=this._intersectsWithPointer(s),n&&s.instance===this.currentContainer&&a!==this.currentItem[0]&&this.placeholder[1===n?"next":"prev"]()[0]!==a&&!e.contains(this.placeholder[0],a)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],a):!0)){if(this.direction=1===n?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,a=this.placeholder.offset(),n=this.options.axis,r={};n&&"x"!==n||(r.left=a.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),n&&"y"!==n||(r.top=a.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,a=s+this.helperProportions.height,n=e.left,r=n+e.width,o=e.top,h=o+e.height,l=this.offset.click.top,u=this.offset.click.left,c="x"===this.options.axis||s+l>o&&h>s+l,d="y"===this.options.axis||t+u>n&&r>t+u,p=c&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>n&&r>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>o&&h>a-this.helperProportions.height/2},_intersectsWithPointer:function(e){var i="x"===this.options.axis||t(this.positionAbs.top+this.offset.click.top,e.top,e.height),s="y"===this.options.axis||t(this.positionAbs.left+this.offset.click.left,e.left,e.width),a=i&&s,n=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection();return a?this.floating?r&&"right"===r||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var i=t(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),s=t(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),a=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&s||"left"===n&&!s:a&&("down"===a&&i||"up"===a&&!i)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var i,s,a,n,r=[],o=[],h=this._connectWith();if(h&&t)for(i=h.length-1;i>=0;i--)for(a=e(h[i]),s=a.length-1;s>=0;s--)n=e.data(a[s],this.widgetFullName),n&&n!==this&&!n.options.disabled&&o.push([e.isFunction(n.options.items)?n.options.items.call(n.element):e(n.options.items,n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),n]);for(o.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=o.length-1;i>=0;i--)o[i][0].each(function(){r.push(this)});return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,a,n,r,o,h,l,u=this.items,c=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(a=e(d[i]),s=a.length-1;s>=0;s--)n=e.data(a[s],this.widgetFullName),n&&n!==this&&!n.options.disabled&&(c.push([e.isFunction(n.options.items)?n.options.items.call(n.element[0],t,{item:this.currentItem}):e(n.options.items,n.element),n]),this.containers.push(n));for(i=c.length-1;i>=0;i--)for(r=c[i][1],o=c[i][0],s=0,l=o.length;l>s;s++)h=e(o[s]),h.data(this.widgetName+"-item",r),u.push({item:h,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,a,n;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(a=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=a.outerWidth(),s.height=a.outerHeight()),n=a.offset(),s.left=n.left,s.top=n.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)n=this.containers[i].element.offset(),this.containers[i].containerCache.left=n.left,this.containers[i].containerCache.top=n.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),a=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(a)}):"img"===s&&a.attr("src",t.currentItem.attr("src")),i||a.css("visibility","hidden"),a},update:function(e,a){(!i||s.forcePlaceholderSize)&&(a.height()||a.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),a.width()||a.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_contactContainers:function(s){var a,n,r,o,h,l,u,c,d,p,f=null,m=null;for(a=this.containers.length-1;a>=0;a--)if(!e.contains(this.currentItem[0],this.containers[a].element[0]))if(this._intersectsWith(this.containers[a].containerCache)){if(f&&e.contains(this.containers[a].element[0],f.element[0]))continue;f=this.containers[a],m=a}else this.containers[a].containerCache.over&&(this.containers[a]._trigger("out",s,this._uiHash(this)),this.containers[a].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(r=1e4,o=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",u=this.positionAbs[h]+this.offset.click[h],n=this.items.length-1;n>=0;n--)e.contains(this.containers[m].element[0],this.items[n].item[0])&&this.items[n].item[0]!==this.currentItem[0]&&(!p||t(this.positionAbs.top+this.offset.click.top,this.items[n].top,this.items[n].height))&&(c=this.items[n].item.offset()[h],d=!1,Math.abs(c-u)>Math.abs(c+this.items[n][l]-u)&&(d=!0,c+=this.items[n][l]),r>Math.abs(c-u)&&(r=Math.abs(c-u),o=this.items[n],this.direction=d?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;o?this._rearrange(s,o,null,!0):this._rearrange(s,null,this.containers[m].element,!0),this._trigger("change",s,this._uiHash()),this.containers[m]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,a=this.options;"parent"===a.containment&&(a.containment=this.helper[0].parentNode),("document"===a.containment||"window"===a.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===a.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===a.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(a.containment)||(t=e(a.containment)[0],i=e(a.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,a="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,n=/(html|body)/i.test(a[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():n?0:a.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():n?0:a.scrollLeft())*s}},_generatePosition:function(t){var i,s,a=this.options,n=t.pageX,r=t.pageY,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(o[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(n=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(n=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),a.grid&&(i=this.originalPageY+Math.round((r-this.originalPageY)/a.grid[1])*a.grid[1],r=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-a.grid[1]:i+a.grid[1]:i,s=this.originalPageX+Math.round((n-this.originalPageX)/a.grid[0])*a.grid[0],n=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-a.grid[0]:s+a.grid[0]:s)),{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:o.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:o.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var a=this.counter;this._delay(function(){a===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&s.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||s.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(s.push(function(e){this._trigger("remove",e,this._uiHash())}),s.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)t||s.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!t){for(this._trigger("beforeStop",e,this._uiHash()),i=0;s.length>i;i++)s[i].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!1}if(t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!t){for(i=0;s.length>i;i++)s[i].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}})})(jQuery);(function(e){var t=0,i={},a={};i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="hide",a.height=a.paddingTop=a.paddingBottom=a.borderTopWidth=a.borderBottomWidth="show",e.widget("ui.accordion",{version:"1.10.3",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e(),content:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),undefined):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t),undefined)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,a=this.headers.length,s=this.headers.index(t.target),n=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:n=this.headers[(s+1)%a];break;case i.LEFT:case i.UP:n=this.headers[(s-1+a)%a];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:n=this.headers[0];break;case i.END:n=this.headers[a-1]}n&&(e(t.target).attr("tabIndex",-1),e(n).attr("tabIndex",0),n.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var i,a=this.options,s=a.heightStyle,n=this.element.parent(),r=this.accordionId="ui-accordion-"+(this.element.attr("id")||++t);this.active=this._findActive(a.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(t){var i=e(this),a=i.attr("id"),s=i.next(),n=s.attr("id");a||(a=r+"-header-"+t,i.attr("id",a)),n||(n=r+"-panel-"+t,s.attr("id",n)),i.attr("aria-controls",n),s.attr("aria-labelledby",a)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(a.event),"fill"===s?(i=n.height(),this.element.siblings(":visible").each(function(){var t=e(this),a=t.css("position");"absolute"!==a&&"fixed"!==a&&(i-=t.outerHeight(!0))}),this.headers.each(function(){i-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(i=0,this.headers.next().each(function(){i=Math.max(i,e(this).css("height","").height())}).height(i))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i=this.options,a=this.active,s=e(t.currentTarget),n=s[0]===a[0],r=n&&i.collapsible,o=r?e():s.next(),h=a.next(),l={oldHeader:a,oldPanel:h,newHeader:r?e():s,newPanel:o};t.preventDefault(),n&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=r?!1:this.headers.index(s),this.active=n?e():s,this._toggle(l),a.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&a.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),n||(s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),s.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,a=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=a,this.options.animate?this._animate(i,a,t):(a.hide(),i.show(),this._toggleComplete(t)),a.attr({"aria-expanded":"false","aria-hidden":"true"}),a.prev().attr("aria-selected","false"),i.length&&a.length?a.prev().attr("tabIndex",-1):i.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(e,t,s){var n,r,o,h=this,l=0,u=e.length&&(!t.length||e.index()<t.index()),d=this.options.animate||{},c=u&&d.down||d,p=function(){h._toggleComplete(s)};return"number"==typeof c&&(o=c),"string"==typeof c&&(r=c),r=r||c.easing||d.easing,o=o||c.duration||d.duration,t.length?e.length?(n=e.show().outerHeight(),t.animate(i,{duration:o,easing:r,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(a,{duration:o,easing:r,complete:p,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?l+=i.now:"content"!==h.options.heightStyle&&(i.now=Math.round(n-t.outerHeight()-l),l=0)}}),undefined):t.animate(i,o,r,p):e.animate(a,o,r,p)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}})})(jQuery);(function(e){var t=0;e.widget("ui.autocomplete",{version:"1.10.3",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,i,a,s=this.element[0].nodeName.toLowerCase(),n="textarea"===s,r="input"===s;this.isMultiLine=n?!0:r?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[n||r?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(s){if(this.element.prop("readOnly"))return t=!0,a=!0,i=!0,undefined;t=!1,a=!1,i=!1;var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:t=!0,this._move("previousPage",s);break;case n.PAGE_DOWN:t=!0,this._move("nextPage",s);break;case n.UP:t=!0,this._keyEvent("previous",s);break;case n.DOWN:t=!0,this._keyEvent("next",s);break;case n.ENTER:case n.NUMPAD_ENTER:this.menu.active&&(t=!0,s.preventDefault(),this.menu.select(s));break;case n.TAB:this.menu.active&&this.menu.select(s);break;case n.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(s),s.preventDefault());break;default:i=!0,this._searchTimeout(s)}},keypress:function(a){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&a.preventDefault(),undefined;if(!i){var s=e.ui.keyCode;switch(a.keyCode){case s.PAGE_UP:this._move("previousPage",a);break;case s.PAGE_DOWN:this._move("nextPage",a);break;case s.UP:this._keyEvent("previous",a);break;case s.DOWN:this._keyEvent("next",a)}}},input:function(e){return a?(a=!1,e.preventDefault(),undefined):(this._searchTimeout(e),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(e),this._change(e),undefined)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(a){a.target===t.element[0]||a.target===i||e.contains(i,a.target)||t.close()})})},menufocus:function(t,i){if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),undefined;var a=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",t,{item:a})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(a.value):this.liveRegion.text(a.value)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),a=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=a,this._delay(function(){this.previous=a,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,a=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,a){a(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,s){a.xhr&&a.xhr.abort(),a.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){s(e)},error:function(){s([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):undefined},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,i=++t;return function(a){i===t&&e.__response(a),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var a=this;e.each(i,function(e,i){a._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<a>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[e](t),undefined):(this.search(null,t),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var a=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return a.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.text(t))}})})(jQuery);(function(e){var t,i,a,s,n="ui-button ui-widget ui-state-default ui-corner-all",r="ui-state-hover ui-state-active ",o="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",h=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},l=function(t){var i=t.name,a=t.form,s=e([]);return i&&(i=i.replace(/'/g,"\\'"),s=a?e(a).find("[name='"+i+"']"):e("[name='"+i+"']",t.ownerDocument).filter(function(){return!this.form})),s};e.widget("ui.button",{version:"1.10.3",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,h),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var r=this,o=this.options,u="checkbox"===this.type||"radio"===this.type,d=u?"":"ui-state-active",c="ui-state-focus";null===o.label&&(o.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(n).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){o.disabled||this===t&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){o.disabled||e(this).removeClass(d)}).bind("click"+this.eventNamespace,function(e){o.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){r.buttonElement.addClass(c)}).bind("blur"+this.eventNamespace,function(){r.buttonElement.removeClass(c)}),u&&(this.element.bind("change"+this.eventNamespace,function(){s||r.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(e){o.disabled||(s=!1,i=e.pageX,a=e.pageY)}).bind("mouseup"+this.eventNamespace,function(e){o.disabled||(i!==e.pageX||a!==e.pageY)&&(s=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return o.disabled||s?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(o.disabled||s)return!1;e(this).addClass("ui-state-active"),r.buttonElement.attr("aria-pressed","true");var t=r.element[0];l(t).not(t).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return o.disabled?!1:(e(this).addClass("ui-state-active"),t=this,r.document.one("mouseup",function(){t=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return o.disabled?!1:(e(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(t){return o.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",o.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(n+" "+r+" "+o).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(t?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?l(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var t=this.buttonElement.removeClass(o),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),a=this.options.icons,s=a.primary&&a.secondary,n=[];a.primary||a.secondary?(this.options.text&&n.push("ui-button-text-icon"+(s?"s":a.primary?"-primary":"-secondary")),a.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+a.primary+"'></span>"),a.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+a.secondary+"'></span>"),this.options.text||(n.push(s?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):n.push("ui-button-text-only"),t.addClass(n.join(" "))}}),e.widget("ui.buttonset",{version:"1.10.3",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function(e,t){function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",function(){e.datepicker._isDisabledDatepicker(n.inline?t.parent()[0]:n.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))})}function s(t,i){e.extend(t,i);for(var a in i)null==i[a]&&(t[a]=i[a]);return t}e.extend(e.ui,{datepicker:{version:"1.10.3"}});var n,r="datepicker";e.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return s(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var a,s,n;a=t.nodeName.toLowerCase(),s="div"===a||"span"===a,t.id||(this.uuid+=1,t.id="dp"+this.uuid),n=this._newInst(e(t),s),n.settings=e.extend({},i||{}),"input"===a?this._connectDatepicker(t,n):s&&this._inlineDatepicker(t,n)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var a=e(t);i.append=e([]),i.trigger=e([]),a.hasClass(this.markerClassName)||(this._attachments(a,i),a.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,r,i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var a,s,n,r=this._get(i,"appendText"),o=this._get(i,"isRTL");i.append&&i.append.remove(),r&&(i.append=e("<span class='"+this._appendClass+"'>"+r+"</span>"),t[o?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),a=this._get(i,"showOn"),("focus"===a||"both"===a)&&t.focus(this._showDatepicker),("button"===a||"both"===a)&&(s=this._get(i,"buttonText"),n=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:n,alt:s,title:s}):e("<button type='button'></button>").addClass(this._triggerClass).html(n?e("<img/>").attr({src:n,alt:s,title:s}):s)),t[o?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,a,s,n=new Date(2009,11,20),r=this._get(e,"dateFormat");r.match(/[DM]/)&&(t=function(e){for(i=0,a=0,s=0;e.length>s;s++)e[s].length>i&&(i=e[s].length,a=s);return a},n.setMonth(t(this._get(e,r.match(/MM/)?"monthNames":"monthNamesShort"))),n.setDate(t(this._get(e,r.match(/DD/)?"dayNames":"dayNamesShort"))+20-n.getDay())),e.input.attr("size",this._formatDate(e,n).length)}},_inlineDatepicker:function(t,i){var a=e(t);a.hasClass(this.markerClassName)||(a.addClass(this.markerClassName).append(i.dpDiv),e.data(t,r,i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,a,n,o){var h,l,u,d,c,p=this._dialogInst;return p||(this.uuid+=1,h="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+h+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},e.data(this._dialogInput[0],r,p)),s(p.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(p,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(l=document.documentElement.clientWidth,u=document.documentElement.clientHeight,d=document.documentElement.scrollLeft||document.body.scrollLeft,c=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+d,u/2-150+c]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=a,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],r,p),this},_destroyDatepicker:function(t){var i,a=e(t),s=e.data(t,r);a.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,r),"input"===i?(s.append.remove(),s.trigger.remove(),a.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&a.removeClass(this.markerClassName).empty())},_enableDatepicker:function(t){var i,a,s=e(t),n=e.data(t,r);s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(a=s.children("."+this._inlineClass),a.children().removeClass("ui-state-disabled"),a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,a,s=e(t),n=e.data(t,r);s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(a=s.children("."+this._inlineClass),a.children().addClass("ui-state-disabled"),a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,r)}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(i,a,n){var r,o,h,l,u=this._getInst(i);return 2===arguments.length&&"string"==typeof a?"defaults"===a?e.extend({},e.datepicker._defaults):u?"all"===a?e.extend({},u.settings):this._get(u,a):null:(r=a||{},"string"==typeof a&&(r={},r[a]=n),u&&(this._curInst===u&&this._hideDatepicker(),o=this._getDateDatepicker(i,!0),h=this._getMinMaxDate(u,"min"),l=this._getMinMaxDate(u,"max"),s(u.settings,r),null!==h&&r.dateFormat!==t&&r.minDate===t&&(u.settings.minDate=this._formatDate(u,h)),null!==l&&r.dateFormat!==t&&r.maxDate===t&&(u.settings.maxDate=this._formatDate(u,l)),"disabled"in r&&(r.disabled?this._disableDatepicker(i):this._enableDatepicker(i)),this._attachments(e(i),u),this._autoSize(u),this._setDate(u,o),this._updateAlternate(u),this._updateDatepicker(u)),t)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,a,s,n=e.datepicker._getInst(t.target),r=!0,o=n.dpDiv.is(".ui-datepicker-rtl");if(n._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),r=!1;break;case 13:return s=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",n.dpDiv),s[0]&&e.datepicker._selectDay(t.target,n.selectedMonth,n.selectedYear,s[0]),i=e.datepicker._get(n,"onSelect"),i?(a=e.datepicker._formatDate(n),i.apply(n.input?n.input[0]:null,[a,n])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(n,"stepBigMonths"):-e.datepicker._get(n,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(n,"stepBigMonths"):+e.datepicker._get(n,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),r=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),r=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,o?1:-1,"D"),r=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(n,"stepBigMonths"):-e.datepicker._get(n,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),r=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,o?-1:1,"D"),r=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(n,"stepBigMonths"):+e.datepicker._get(n,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),r=t.ctrlKey||t.metaKey;break;default:r=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):r=!1;r&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(i){var a,s,n=e.datepicker._getInst(i.target);return e.datepicker._get(n,"constrainInput")?(a=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==i.charCode?i.keyCode:i.charCode),i.ctrlKey||i.metaKey||" ">s||!a||a.indexOf(s)>-1):t},_doKeyUp:function(t){var i,a=e.datepicker._getInst(t.target);if(a.input.val()!==a.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,e.datepicker._getFormatConfig(a)),i&&(e.datepicker._setDateFromField(a),e.datepicker._updateAlternate(a),e.datepicker._updateDatepicker(a))}catch(s){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,a,n,r,o,h,l;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),a=e.datepicker._get(i,"beforeShow"),n=a?a.apply(t,[t,i]):{},n!==!1&&(s(i.settings,n),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),r=!1,e(t).parents().each(function(){return r|="fixed"===e(this).css("position"),!r}),o={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),o=e.datepicker._checkOffset(i,o,r),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":r?"fixed":"absolute",display:"none",left:o.left+"px",top:o.top+"px"}),i.inline||(h=e.datepicker._get(i,"showAnim"),l=e.datepicker._get(i,"duration"),i.dpDiv.zIndex(e(t).zIndex()+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[h]?i.dpDiv.show(h,e.datepicker._get(i,"showOptions"),l):i.dpDiv[h||"show"](h?l:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,n=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t),t.dpDiv.find("."+this._dayOverClass+" a").mouseover();var i,a=this._getNumberOfMonths(t),s=a[1],r=17;t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),s>1&&t.dpDiv.addClass("ui-datepicker-multi-"+s).css("width",r*s+"em"),t.dpDiv[(1!==a[0]||1!==a[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,a){var s=t.dpDiv.outerWidth(),n=t.dpDiv.outerHeight(),r=t.input?t.input.outerWidth():0,o=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(a?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(a?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?s-r:0,i.left-=a&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=a&&i.top===t.input.offset().top+o?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+s>h&&h>s?Math.abs(i.left+s-h):0),i.top-=Math.min(i.top,i.top+n>l&&l>n?Math.abs(n+o):0),i},_findPos:function(t){for(var i,a=this._getInst(t),s=this._get(a,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[s?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,a,s,n,o=this._curInst;!o||t&&o!==e.data(t,r)||this._datepickerShowing&&(i=this._get(o,"showAnim"),a=this._get(o,"duration"),s=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),a,s):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?a:null,s),i||s(),this._datepickerShowing=!1,n=this._get(o,"onClose"),n&&n.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),a=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==a)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,a){var s=e(t),n=this._getInst(s[0]);this._isDisabledDatepicker(s[0])||(this._adjustInstDate(n,i+("M"===a?this._get(n,"showCurrentAtPos"):0),a),this._updateDatepicker(n))},_gotoToday:function(t){var i,a=e(t),s=this._getInst(a[0]);this._get(s,"gotoCurrent")&&s.currentDay?(s.selectedDay=s.currentDay,s.drawMonth=s.selectedMonth=s.currentMonth,s.drawYear=s.selectedYear=s.currentYear):(i=new Date,s.selectedDay=i.getDate(),s.drawMonth=s.selectedMonth=i.getMonth(),s.drawYear=s.selectedYear=i.getFullYear()),this._notifyChange(s),this._adjustDate(a)},_selectMonthYear:function(t,i,a){var s=e(t),n=this._getInst(s[0]);n["selected"+("M"===a?"Month":"Year")]=n["draw"+("M"===a?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(n),this._adjustDate(s)},_selectDay:function(t,i,a,s){var n,r=e(t);e(s).hasClass(this._unselectableClass)||this._isDisabledDatepicker(r[0])||(n=this._getInst(r[0]),n.selectedDay=n.currentDay=e("a",s).html(),n.selectedMonth=n.currentMonth=i,n.selectedYear=n.currentYear=a,this._selectDate(t,this._formatDate(n,n.currentDay,n.currentMonth,n.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var a,s=e(t),n=this._getInst(s[0]);i=null!=i?i:this._formatDate(n),n.input&&n.input.val(i),this._updateAlternate(n),a=this._get(n,"onSelect"),a?a.apply(n.input?n.input[0]:null,[i,n]):n.input&&n.input.trigger("change"),n.inline?this._updateDatepicker(n):(this._hideDatepicker(),this._lastInput=n.input[0],"object"!=typeof n.input[0]&&n.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,a,s,n=this._get(t,"altField");n&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),a=this._getDate(t),s=this.formatDate(i,a,this._getFormatConfig(t)),e(n).each(function(){e(this).val(s)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(i,a,s){if(null==i||null==a)throw"Invalid arguments";if(a="object"==typeof a?""+a:a+"",""===a)return null;var n,r,o,h,l=0,u=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,d="string"!=typeof u?u:(new Date).getFullYear()%100+parseInt(u,10),c=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,p=(s?s.dayNames:null)||this._defaults.dayNames,m=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,g=-1,v=-1,y=-1,b=-1,_=!1,k=function(e){var t=i.length>n+1&&i.charAt(n+1)===e;return t&&n++,t},x=function(e){var t=k(e),i="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,s=RegExp("^\\d{1,"+i+"}"),n=a.substring(l).match(s);if(!n)throw"Missing number at position "+l;return l+=n[0].length,parseInt(n[0],10)},D=function(i,s,n){var r=-1,o=e.map(k(i)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,i){var s=i[1];return a.substr(l,s.length).toLowerCase()===s.toLowerCase()?(r=i[0],l+=s.length,!1):t}),-1!==r)return r+1;throw"Unknown name at position "+l},w=function(){if(a.charAt(l)!==i.charAt(n))throw"Unexpected literal at position "+l;l++};for(n=0;i.length>n;n++)if(_)"'"!==i.charAt(n)||k("'")?w():_=!1;else switch(i.charAt(n)){case"d":y=x("d");break;case"D":D("D",c,p);break;case"o":b=x("o");break;case"m":v=x("m");break;case"M":v=D("M",m,f);break;case"y":g=x("y");break;case"@":h=new Date(x("@")),g=h.getFullYear(),v=h.getMonth()+1,y=h.getDate();break;case"!":h=new Date((x("!")-this._ticksTo1970)/1e4),g=h.getFullYear(),v=h.getMonth()+1,y=h.getDate();break;case"'":k("'")?w():_=!0;break;default:w()}if(a.length>l&&(o=a.substr(l),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===g?g=(new Date).getFullYear():100>g&&(g+=(new Date).getFullYear()-(new Date).getFullYear()%100+(d>=g?0:-100)),b>-1)for(v=1,y=b;;){if(r=this._getDaysInMonth(g,v-1),r>=y)break;v++,y-=r}if(h=this._daylightSavingAdjust(new Date(g,v-1,y)),h.getFullYear()!==g||h.getMonth()+1!==v||h.getDate()!==y)throw"Invalid date";return h},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var a,s=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,n=(i?i.dayNames:null)||this._defaults.dayNames,r=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,o=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>a+1&&e.charAt(a+1)===t;return i&&a++,i},l=function(e,t,i){var a=""+t;if(h(e))for(;i>a.length;)a="0"+a;return a},u=function(e,t,i,a){return h(e)?a[t]:i[t]},d="",c=!1;if(t)for(a=0;e.length>a;a++)if(c)"'"!==e.charAt(a)||h("'")?d+=e.charAt(a):c=!1;else switch(e.charAt(a)){case"d":d+=l("d",t.getDate(),2);break;case"D":d+=u("D",t.getDay(),s,n);break;case"o":d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":d+=l("m",t.getMonth()+1,2);break;case"M":d+=u("M",t.getMonth(),r,o);break;case"y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":d+=t.getTime();break;case"!":d+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(a)}return d},_possibleChars:function(e){var t,i="",a=!1,s=function(i){var a=e.length>t+1&&e.charAt(t+1)===i;return a&&t++,a};for(t=0;e.length>t;t++)if(a)"'"!==e.charAt(t)||s("'")?i+=e.charAt(t):a=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":s("'")?i+="'":a=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,i){return e.settings[i]!==t?e.settings[i]:this._defaults[i]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),a=e.lastVal=e.input?e.input.val():null,s=this._getDefaultDate(e),n=s,r=this._getFormatConfig(e);try{n=this.parseDate(i,a,r)||s}catch(o){a=t?"":a}e.selectedDay=n.getDate(),e.drawMonth=e.selectedMonth=n.getMonth(),e.drawYear=e.selectedYear=n.getFullYear(),e.currentDay=a?n.getDate():0,e.currentMonth=a?n.getMonth():0,e.currentYear=a?n.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,a){var s=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},n=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(a){}for(var s=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,n=s.getFullYear(),r=s.getMonth(),o=s.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":o+=parseInt(l[1],10);break;case"w":case"W":o+=7*parseInt(l[1],10);break;case"m":case"M":r+=parseInt(l[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,r));break;case"y":case"Y":n+=parseInt(l[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,r))}l=h.exec(i)}return new Date(n,r,o)},r=null==i||""===i?a:"string"==typeof i?n(i):"number"==typeof i?isNaN(i)?a:s(i):new Date(i.getTime());return r=r&&"Invalid Date"==""+r?a:r,r&&(r.setHours(0),r.setMinutes(0),r.setSeconds(0),r.setMilliseconds(0)),this._daylightSavingAdjust(r)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var a=!t,s=e.selectedMonth,n=e.selectedYear,r=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=r.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=r.getMonth(),e.drawYear=e.selectedYear=e.currentYear=r.getFullYear(),s===e.selectedMonth&&n===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(a?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),a="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(a,-i,"M")},next:function(){e.datepicker._adjustDate(a,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(a)},selectDay:function(){return e.datepicker._selectDay(a,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(a,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(a,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,a,s,n,r,o,h,l,u,d,c,p,m,f,g,v,y,b,_,k,x,D,w,T,M,S,N,C,A,P,I,F,j,H,E,z,L,O,R=new Date,W=this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())),Y=this._get(e,"isRTL"),J=this._get(e,"showButtonPanel"),$=this._get(e,"hideIfNoPrevNext"),Q=this._get(e,"navigationAsDateFormat"),B=this._getNumberOfMonths(e),K=this._get(e,"showCurrentAtPos"),V=this._get(e,"stepMonths"),U=1!==B[0]||1!==B[1],G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),q=this._getMinMaxDate(e,"min"),X=this._getMinMaxDate(e,"max"),Z=e.drawMonth-K,et=e.drawYear;if(0>Z&&(Z+=12,et--),X)for(t=this._daylightSavingAdjust(new Date(X.getFullYear(),X.getMonth()-B[0]*B[1]+1,X.getDate())),t=q&&q>t?q:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=Q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-V,1)),this._getFormatConfig(e)):i,a=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":$?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",s=this._get(e,"nextText"),s=Q?this.formatDate(s,this._daylightSavingAdjust(new Date(et,Z+V,1)),this._getFormatConfig(e)):s,n=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+s+"</span></a>":$?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+s+"</span></a>",r=this._get(e,"currentText"),o=this._get(e,"gotoCurrent")&&e.currentDay?G:W,r=Q?this.formatDate(r,o,this._getFormatConfig(e)):r,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=J?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,o)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+r+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),m=this._get(e,"monthNames"),f=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",x=0;B[0]>x;x++){for(D="",this.maxRows=4,w=0;B[1]>w;w++){if(T=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),M=" ui-corner-all",S="",U){if(S+="<div class='ui-datepicker-group",B[1]>1)switch(w){case 0:S+=" ui-datepicker-group-first",M=" ui-corner-"+(Y?"right":"left");break;case B[1]-1:S+=" ui-datepicker-group-last",M=" ui-corner-"+(Y?"left":"right");break;default:S+=" ui-datepicker-group-middle",M=""}S+="'>"}for(S+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+M+"'>"+(/all|left/.test(M)&&0===x?Y?n:a:"")+(/all|right/.test(M)&&0===x?Y?a:n:"")+this._generateMonthYearHeader(e,Z,et,q,X,x>0||w>0,m,f)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",N=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",k=0;7>k;k++)C=(k+u)%7,N+="<th"+((k+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[C]+"'>"+p[C]+"</span></th>";for(S+=N+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),F=U?this.maxRows>I?this.maxRows:I:I,this.maxRows=F,j=this._daylightSavingAdjust(new Date(et,Z,1-P)),H=0;F>H;H++){for(S+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(j)+"</td>":"",k=0;7>k;k++)z=g?g.apply(e.input?e.input[0]:null,[j]):[!0,""],L=j.getMonth()!==Z,O=L&&!y||!z[0]||q&&q>j||X&&j>X,E+="<td class='"+((k+u+6)%7>=5?" ui-datepicker-week-end":"")+(L?" ui-datepicker-other-month":"")+(j.getTime()===T.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===j.getTime()&&b.getTime()===T.getTime()?" "+this._dayOverClass:"")+(O?" "+this._unselectableClass+" ui-state-disabled":"")+(L&&!v?"":" "+z[1]+(j.getTime()===G.getTime()?" "+this._currentClass:"")+(j.getTime()===W.getTime()?" ui-datepicker-today":""))+"'"+(L&&!v||!z[2]?"":" title='"+z[2].replace(/'/g,"&#39;")+"'")+(O?"":" data-handler='selectDay' data-event='click' data-month='"+j.getMonth()+"' data-year='"+j.getFullYear()+"'")+">"+(L&&!v?"&#xa0;":O?"<span class='ui-state-default'>"+j.getDate()+"</span>":"<a class='ui-state-default"+(j.getTime()===W.getTime()?" ui-state-highlight":"")+(j.getTime()===G.getTime()?" ui-state-active":"")+(L?" ui-priority-secondary":"")+"' href='#'>"+j.getDate()+"</a>")+"</td>",j.setDate(j.getDate()+1),j=this._daylightSavingAdjust(j);S+=E+"</tr>"}Z++,Z>11&&(Z=0,et++),S+="</tbody></table>"+(U?"</div>"+(B[0]>0&&w===B[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),D+=S}_+=D}return _+=l,e._keyEvent=!1,_},_generateMonthYearHeader:function(e,t,i,a,s,n,r,o){var h,l,u,d,c,p,m,f,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(n||!g)_+="<span class='ui-datepicker-month'>"+r[t]+"</span>";else{for(h=a&&a.getFullYear()===i,l=s&&s.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=a.getMonth())&&(!l||s.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+o[u]+"</option>");_+="</select>"}if(y||(b+=_+(!n&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",n||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(d=this._get(e,"yearRange").split(":"),c=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);
return isNaN(t)?c:t},m=p(d[0]),f=Math.max(m,p(d[1]||"")),m=a?Math.max(m,a.getFullYear()):m,f=s?Math.min(f,s.getFullYear()):f,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";f>=m;m++)e.yearshtml+="<option value='"+m+"'"+(m===i?" selected='selected'":"")+">"+m+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!n&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(e,t,i){var a=e.drawYear+("Y"===i?t:0),s=e.drawMonth+("M"===i?t:0),n=Math.min(e.selectedDay,this._getDaysInMonth(a,s))+("D"===i?t:0),r=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(a,s,n)));e.selectedDay=r.getDate(),e.drawMonth=e.selectedMonth=r.getMonth(),e.drawYear=e.selectedYear=r.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),s=i&&i>t?i:t;return a&&s>a?a:s},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,a){var s=this._getNumberOfMonths(e),n=this._daylightSavingAdjust(new Date(i,a+(0>t?t:s[0]*s[1]),1));return 0>t&&n.setDate(this._getDaysInMonth(n.getFullYear(),n.getMonth())),this._isInRange(e,n)},_isInRange:function(e,t){var i,a,s=this._getMinMaxDate(e,"min"),n=this._getMinMaxDate(e,"max"),r=null,o=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),a=(new Date).getFullYear(),r=parseInt(i[0],10),o=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(r+=a),i[1].match(/[+\-].*/)&&(o+=a)),(!s||t.getTime()>=s.getTime())&&(!n||t.getTime()<=n.getTime())&&(!r||t.getFullYear()>=r)&&(!o||o>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,a){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var s=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(a,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),s,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new i,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.10.3"})(jQuery);(function(e){var t={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};e.widget("ui.dialog",{version:"1.10.3",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i=this;this._isOpen&&this._trigger("beforeClose",t)!==!1&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||e(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",t)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,t){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!t&&this._trigger("focus",e),i},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var e=this.element.find("[autofocus]");e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),undefined;if(t.keyCode===e.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),a=i.filter(":first"),s=i.filter(":last");t.target!==s[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==a[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(s.focus(1),t.preventDefault()):(a.focus(1),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(e.each(i,function(i,a){var s,n;a=e.isFunction(a)?{click:a,text:i}:a,a=e.extend({type:"button"},a),s=a.click,a.click=function(){s.apply(t.element[0],arguments)},n={icons:a.icons,text:a.showText},delete a.icons,delete a.showText,e("<button></button>",a).button(n).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,a=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(a,s){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",a,t(s))},drag:function(e,a){i._trigger("drag",e,t(a))},stop:function(s,n){a.position=[n.position.left-i.document.scrollLeft(),n.position.top-i.document.scrollTop()],e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",s,t(n))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,a=this.options,s=a.resizable,n=this.uiDialog.css("position"),r="string"==typeof s?s:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:a.maxWidth,maxHeight:a.maxHeight,minWidth:a.minWidth,minHeight:this._minHeight(),handles:r,start:function(a,s){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",a,t(s))},resize:function(e,a){i._trigger("resize",e,t(a))},stop:function(s,n){a.height=e(this).height(),a.width=e(this).width(),e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",s,t(n))}}).css("position",n)},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(a){var s=this,n=!1,r={};e.each(a,function(e,a){s._setOption(e,a),e in t&&(n=!0),e in i&&(r[e]=a)}),n&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",r)},_setOption:function(e,t){var i,a,s=this.uiDialog;"dialogClass"===e&&s.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=s.is(":data(ui-draggable)"),i&&!t&&s.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(a=s.is(":data(ui-resizable)"),a&&!t&&s.resizable("destroy"),a&&"string"==typeof t&&s.resizable("option","handles",t),a||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,a=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),a.minWidth>a.width&&(a.width=a.minWidth),e=this.uiDialog.css({height:"auto",width:a.width}).outerHeight(),t=Math.max(0,a.minHeight-e),i="number"==typeof a.maxHeight?Math.max(0,a.maxHeight-e):"none","auto"===a.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,a.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=this,i=this.widgetFullName;e.ui.dialog.overlayInstances||this._delay(function(){e.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(a){t._allowInteraction(a)||(a.preventDefault(),e(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),e.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(e.ui.dialog.overlayInstances--,e.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),e.ui.dialog.overlayInstances=0,e.uiBackCompat!==!1&&e.widget("ui.dialog",e.ui.dialog,{_position:function(){var t,i=this.options.position,a=[],s=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(a=i.split?i.split(" "):[i[0],i[1]],1===a.length&&(a[1]=a[0]),e.each(["left","top"],function(e,t){+a[e]===a[e]&&(s[e]=a[e],a[e]=t)}),i={my:a[0]+(0>s[0]?s[0]:"+"+s[0])+" "+a[1]+(0>s[1]?s[1]:"+"+s[1]),at:a.join(" ")}),i=e.extend({},e.ui.dialog.prototype.options.position,i)):i=e.ui.dialog.prototype.options.position,t=this.uiDialog.is(":visible"),t||this.uiDialog.show(),this.uiDialog.position(i),t||this.uiDialog.hide()}})})(jQuery);(function(e){e.widget("ui.menu",{version:"1.10.3",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var i=e(t.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(t),i.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var i=e(t.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function i(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,a,n,r,o,h=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:h=!1,a=this.previousFilter||"",n=String.fromCharCode(t.keyCode),r=!1,clearTimeout(this.filterTimer),n===a?r=!0:n=a+n,o=RegExp("^"+i(n),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),s=r&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(n=String.fromCharCode(t.keyCode),o=RegExp("^"+i(n),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),s.length?(this.focus(t,s),s.length>1?(this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,i=this.options.icons.submenu,s=this.element.find(this.options.menus);s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),s=t.prev("a"),a=e("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(a),t.attr("aria-labelledby",s.attr("id"))}),t=s.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-\u2014\u2013\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,a,n,r,o;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,a=t.offset().top-this.activeMenu.offset().top-i-s,n=this.activeMenu.scrollTop(),r=this.activeMenu.height(),o=t.height(),0>a?this.activeMenu.scrollTop(n+a):a+o>r&&this.activeMenu.scrollTop(n+a-r+o))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[t]()),this.focus(i,s)},nextPage:function(t){var i,s,a;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,a=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-a}),this.focus(t,i)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(t),undefined)},previousPage:function(t){var i,s,a;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,a=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+a>0}),this.focus(t,i)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(t),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)}})})(jQuery);(function(e,t){e.widget("ui.progressbar",{version:"1.10.3",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return e===t?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),t)},_constrainedValue:function(e){return e===t&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),this._super(e,t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}})})(jQuery);(function(e){var t=5;e.widget("ui.slider",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,a=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),n="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",r=[];for(i=s.values&&s.values.length||1,a.length>i&&(a.slice(i).remove(),a=a.slice(0,i)),t=a.length;i>t;t++)r.push(n);this.handles=a.add(e(r.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):this.range=e([])},_setupEvents:function(){var e=this.handles.add(this.range).filter("a");this._off(e),this._on(e,this._handleEvents),this._hoverable(e),this._focusable(e)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,a,n,r,o,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),a=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(a>i||a===i&&(t===u._lastChangedValue||u.values(t)===c.min))&&(a=i,n=e(this),r=t)}),o=this._start(t,r),o===!1?!1:(this._mouseSliding=!0,this._handleIndex=r,n.addClass("ui-state-active").focus(),h=n.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-n.width()/2,top:t.pageY-h.top-n.height()/2-(parseInt(n.css("borderTopWidth"),10)||0)-(parseInt(n.css("borderBottomWidth"),10)||0)+(parseInt(n.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,r,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,a,n;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),a=this._valueMax()-this._valueMin(),n=this._valueMin()+s*a,this._trimAlignValue(n)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,a,n;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(a=this.values(),a[t]=i,n=this._trigger("slide",e,{handle:this.handles[t],value:i,values:a}),s=this.values(t?0:1),n!==!1&&this.values(t,i,!0))):i!==this.value()&&(n=this._trigger("slide",e,{handle:this.handles[t],value:i}),n!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(t,i){var s,a,n;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),undefined;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,a=arguments[0],n=0;s.length>n;n+=1)s[n]=this._trimAlignValue(a[n]),this._change(null,n);this._refreshValue()},_setOption:function(t,i){var s,a=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(a=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;a>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,i,s,a,n,r=this.options.range,o=this.options,h=this,l=this._animateOff?!1:o.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,o.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:o.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:o.animate}))),t=i}):(s=this.value(),a=this._valueMin(),n=this._valueMax(),i=n!==a?100*((s-a)/(n-a)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,o.animate),"min"===r&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},o.animate),"max"===r&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:o.animate}),"min"===r&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},o.animate),"max"===r&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:o.animate}))},_handleEvents:{keydown:function(i){var s,a,n,r,o=e(i.target).data("ui-slider-handle-index");switch(i.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(i.target).addClass("ui-state-active"),s=this._start(i,o),s===!1))return}switch(r=this.options.step,a=n=this.options.values&&this.options.values.length?this.values(o):this.value(),i.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(a+(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(a-(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(a===this._valueMax())return;n=this._trimAlignValue(a+r);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(a===this._valueMin())return;n=this._trimAlignValue(a-r)}this._slide(i,o,n)},click:function(e){e.preventDefault()},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}})})(jQuery);(function(e){function t(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.widget("ui.spinner",{version:"1.10.3",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var a=i.attr(s);void 0!==a&&a.length&&(t[s]=a)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(t?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:t(function(e){this._super(e),this._value(this.element.val())}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:t(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:t(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:t(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(t(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})})(jQuery);(function(e,t){function i(){return++a}function s(e){return e.hash.length>1&&decodeURIComponent(e.href.replace(n,""))===decodeURIComponent(location.href.replace(n,""))}var a=0,n=/#.*$/;e.widget("ui.tabs",{version:"1.10.3",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var i=this.options.active,s=this.options.collapsible,a=location.hash.substring(1);return null===i&&(a&&this.tabs.each(function(s,n){return e(n).attr("aria-controls")===a?(i=s,!1):t}),null===i&&(i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===i||-1===i)&&(i=this.tabs.length?0:!1)),i!==!1&&(i=this.tabs.index(this.tabs.eq(i)),-1===i&&(i=s?!1:0)),!s&&i===!1&&this.anchors.length&&(i=0),i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(i){var s=e(this.document[0].activeElement).closest("li"),a=this.tabs.index(s),n=!0;if(!this._handlePageNav(i)){switch(i.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:a++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,a--;break;case e.ui.keyCode.END:a=this.anchors.length-1;break;case e.ui.keyCode.HOME:a=0;break;case e.ui.keyCode.SPACE:return i.preventDefault(),clearTimeout(this.activating),this._activate(a),t;case e.ui.keyCode.ENTER:return i.preventDefault(),clearTimeout(this.activating),this._activate(a===this.options.active?!1:a),t;default:return}i.preventDefault(),clearTimeout(this.activating),a=this._focusNextTab(a,n),i.ctrlKey||(s.attr("aria-selected","false"),this.tabs.eq(a).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",a)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(i){return i.altKey&&i.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):i.altKey&&i.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):t},_findNextTab:function(t,i){function s(){return t>a&&(t=0),0>t&&(t=a),t}for(var a=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,i){return"active"===e?(this._activate(i),t):"disabled"===e?(this._setupDisabled(i),t):(this._super(e,i),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",i),i||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(i),"heightStyle"===e&&this._setupHeightStyle(i),t)},_tabId:function(e){return e.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,a){var n,r,o,h=e(a).uniqueId().attr("id"),l=e(a).closest("li"),u=l.attr("aria-controls");s(a)?(n=a.hash,r=t.element.find(t._sanitizeSelector(n))):(o=t._tabId(l),n="#"+o,r=t.element.find(n),r.length||(r=t._createPanel(o),r.insertAfter(t.panels[i-1]||t.tablist)),r.attr("aria-live","polite")),r.length&&(t.panels=t.panels.add(r)),u&&l.data("ui-tabs-aria-controls",u),l.attr({"aria-controls":n.substring(1),"aria-labelledby":h}),r.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++)t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var i={click:function(e){e.preventDefault()}};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,a=e(t.currentTarget),n=a.closest("li"),r=n[0]===s[0],o=r&&i.collapsible,h=o?e():this._getPanelForTab(n),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:o?e():n,newPanel:h};t.preventDefault(),n.hasClass("ui-state-disabled")||n.hasClass("ui-tabs-loading")||this.running||r&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=o?!1:this.tabs.index(n),this.active=r?e():n,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(n),t),this._toggle(t,u))},_toggle:function(t,i){function s(){n.running=!1,n._trigger("activate",t,i)}function a(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&n.options.show?n._show(r,n.options.show,s):(r.show(),s())}var n=this,r=i.newPanel,o=i.oldPanel;this.running=!0,o.length&&this.options.hide?this._hide(o,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),a()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),o.hide(),a()),o.attr({"aria-expanded":"false","aria-hidden":"true"}),i.oldTab.attr("aria-selected","false"),r.length&&o.length?i.oldTab.attr("tabIndex",-1):r.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),r.attr({"aria-expanded":"true","aria-hidden":"false"}),i.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var s=this.options.disabled;s!==!1&&(i===t?s=!1:(i=this._getIndex(i),s=e.isArray(s)?e.map(s,function(e){return e!==i?e:null}):e.map(this.tabs,function(e,t){return t!==i?t:null})),this._setupDisabled(s))},disable:function(i){var s=this.options.disabled;if(s!==!0){if(i===t)s=!0;else{if(i=this._getIndex(i),-1!==e.inArray(i,s))return;s=e.isArray(s)?e.merge([i],s).sort():[i]}this._setupDisabled(s)}},load:function(t,i){t=this._getIndex(t);var a=this,n=this.tabs.eq(t),r=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),h={tab:n,panel:o};s(r[0])||(this.xhr=e.ajax(this._ajaxSettings(r,i,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){o.html(e),a._trigger("load",i,h)},1)}).complete(function(e,t){setTimeout(function(){"abort"===t&&a.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===a.xhr&&delete a.xhr},1)})))},_ajaxSettings:function(t,i,s){var a=this;return{url:t.attr("href"),beforeSend:function(t,n){return a._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:n},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})})(jQuery);(function(e){function t(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))}function i(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),a=e.inArray(i,s);-1!==a&&s.splice(a,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")}var s=0;e.widget("ui.tooltip",{version:"1.10.3",options:{content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,i){var s=this;return"disabled"===t?(this[i?"_disable":"_enable"](),this.options[t]=i,void 0):(this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t)}),void 0)},_disable:function(){var t=this;e.each(this.tooltips,function(i,s){var a=e.Event("blur");a.target=a.currentTarget=s[0],t.close(a,!0)}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,a=this,n=t?t.type:null;return"string"==typeof s?this._open(t,e,s):(i=s.call(e[0],function(i){e.data("ui-tooltip-open")&&a._delay(function(){t&&(t.type=n),this._open(t,e,i)})}),i&&this._open(t,e,i),void 0)},_open:function(i,s,a){function n(e){l.of=e,r.is(":hidden")||r.position(l)}var r,o,h,l=e.extend({},this.options.position);if(a){if(r=this._find(s),r.length)return r.find(".ui-tooltip-content").html(a),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),r=this._tooltip(s),t(s,r.attr("id")),r.find(".ui-tooltip-content").html(a),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:n}),n(i)):r.position(e.extend({of:s},this.options.position)),r.hide(),this._show(r,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){r.is(":visible")&&(n(l.of),clearInterval(h))},e.fx.interval)),this._trigger("open",i,{tooltip:r}),o={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var i=e.Event(t);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(r)}},i&&"mouseover"!==i.type||(o.mouseleave="close"),i&&"focusin"!==i.type||(o.focusout="close"),this._on(!0,s,o)}},close:function(t){var s=this,a=e(t?t.currentTarget:this.element),n=this._find(a);this.closing||(clearInterval(this.delayedShow),a.data("ui-tooltip-title")&&a.attr("title",a.data("ui-tooltip-title")),i(a),n.stop(!0),this._hide(n,this.options.hide,function(){s._removeTooltip(e(this))}),a.removeData("ui-tooltip-open"),this._off(a,"mouseleave focusout keyup"),a[0]!==this.element[0]&&this._off(a,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]}),this.closing=!0,this._trigger("close",t,{tooltip:n}),this.closing=!1)},_tooltip:function(t){var i="ui-tooltip-"+s++,a=e("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(a),a.appendTo(this.document[0].body),this.tooltips[i]=t,a},_find:function(t){var i=t.data("ui-tooltip-id");return i?e("#"+i):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(i,s){var a=e.Event("blur");a.target=a.currentTarget=s[0],t.close(a,!0),e("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);(function(e,t){var i="ui-effects-";e.effects={effect:{}},function(e,t){function i(e,t,i){var s=c[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),a=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,n){var r,o=n.re.exec(i),h=o&&n.parse(o),l=n.space||"rgba";return h?(r=s[l](h),s[u[l].cache]=r[u[l].cache],a=s._rgba=r._rgba,!1):t}),a.length?("0,0,0,0"===a.join()&&e.extend(a,n.transparent),s):n[i]}function a(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var n,r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",o=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,a){return new e.Color.fn.parse(t,i,s,a)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(a,r,o,h){if(a===t)return this._rgba=[null,null,null,null],this;(a.jquery||a.nodeType)&&(a=e(a).css(r),r=t);var c=this,d=e.type(a),p=this._rgba=[];return r!==t&&(a=[a,r,o,h],d="array"),"string"===d?this.parse(s(a)||n._default):"array"===d?(f(u.rgba.props,function(e,t){p[t.idx]=i(a[t.idx],t)}),this):"object"===d?(a instanceof l?f(u,function(e,t){a[t.cache]&&(c[t.cache]=a[t.cache].slice())}):f(u,function(t,s){var n=s.cache;f(s.props,function(e,t){if(!c[n]&&s.to){if("alpha"===e||null==a[e])return;c[n]=s.to(c._rgba)}c[n][t.idx]=i(a[e],t,!0)}),c[n]&&0>e.inArray(null,c[n].slice(0,3))&&(c[n][3]=1,s.from&&(c._rgba=s.from(c[n])))}),this):t},is:function(e){var i=l(e),s=!0,a=this;return f(u,function(e,n){var r,o=i[n.cache];return o&&(r=a[n.cache]||n.to&&n.to(a._rgba)||[],f(n.props,function(e,i){return null!=o[i.idx]?s=o[i.idx]===r[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),a=s._space(),n=u[a],r=0===this.alpha()?l("transparent"):this,o=r[n.cache]||n.to(r._rgba),h=o.slice();return s=s[n.cache],f(n.props,function(e,a){var n=a.idx,r=o[n],l=s[n],u=c[a.type]||{};null!==l&&(null===r?h[n]=l:(u.mod&&(l-r>u.mod/2?r+=u.mod:r-l>u.mod/2&&(r-=u.mod)),h[n]=i((l-r)*t+r,a)))}),this[a](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),a=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*a[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,a=e[1]/255,n=e[2]/255,r=e[3],o=Math.max(s,a,n),h=Math.min(s,a,n),l=o-h,u=o+h,c=.5*u;return t=h===o?0:s===o?60*(a-n)/l+360:a===o?60*(n-s)/l+120:60*(s-a)/l+240,i=0===l?0:.5>=c?l/u:l/(2-u),[Math.round(t)%360,i,c,null==r?1:r]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],n=e[3],r=.5>=s?s*(1+i):s+i-s*i,o=2*s-r;return[Math.round(255*a(o,r,t+1/3)),Math.round(255*a(o,r,t)),Math.round(255*a(o,r,t-1/3)),n]},f(u,function(s,a){var n=a.props,r=a.cache,h=a.to,u=a.from;l.fn[s]=function(s){if(h&&!this[r]&&(this[r]=h(this._rgba)),s===t)return this[r].slice();var a,o=e.type(s),c="array"===o||"object"===o?s:arguments,d=this[r].slice();return f(n,function(e,t){var s=c["object"===o?e:t.idx];null==s&&(s=d[t.idx]),d[t.idx]=i(s,t)}),u?(a=l(u(d)),a[r]=d,a):l(d)},f(n,function(t,i){l.fn[t]||(l.fn[t]=function(a){var n,r=e.type(a),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===r?u:("function"===r&&(a=a.call(this,u),r=e.type(a)),null==a&&i.empty?this:("string"===r&&(n=o.exec(a),n&&(a=u+parseFloat(n[2])*("+"===n[1]?1:-1))),l[i.idx]=a,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,a){var n,r,o="";if("transparent"!==a&&("string"!==e.type(a)||(n=s(a)))){if(a=l(n||a),!d.rgba&&1!==a._rgba[3]){for(r="backgroundColor"===i?t.parentNode:t;(""===o||"transparent"===o)&&r&&r.style;)try{o=e.css(r,"backgroundColor"),r=r.parentNode}catch(h){}a=a.blend(o&&"transparent"!==o?o:"_default")}a=a.toRgbaString()}try{t.style[i]=a}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(r),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},n=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(t){var i,s,a=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,n={};if(a&&a.length&&a[0]&&a[a[0]])for(s=a.length;s--;)i=a[s],"string"==typeof a[i]&&(n[e.camelCase(i)]=a[i]);else for(i in a)"string"==typeof a[i]&&(n[i]=a[i]);return n}function s(t,i){var s,a,r={};for(s in i)a=i[s],t[s]!==a&&(n[s]||(e.fx.step[s]||!isNaN(parseFloat(a)))&&(r[s]=a));return r}var a=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(jQuery.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(t,n,r,o){var h=e.speed(n,r,o);return this.queue(function(){var n,r=e(this),o=r.attr("class")||"",l=h.children?r.find("*").addBack():r;l=l.map(function(){var t=e(this);return{el:t,start:i(this)}}),n=function(){e.each(a,function(e,i){t[i]&&r[i+"Class"](t[i])})},n(),l=l.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),r.attr("class",o),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){n(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(r[0])})})},e.fn.extend({addClass:function(t){return function(i,s,a,n){return s?e.effects.animateClass.call(this,{add:i},s,a,n):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,a,n){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,a,n):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(i){return function(s,a,n,r,o){return"boolean"==typeof a||a===t?n?e.effects.animateClass.call(this,a?{add:s}:{remove:s},n,r,o):i.apply(this,arguments):e.effects.animateClass.call(this,{toggle:s},a,n,r)}}(e.fn.toggleClass),switchClass:function(t,i,s,a,n){return e.effects.animateClass.call(this,{add:i,remove:t},s,a,n)}})}(),function(){function s(t,i,s,a){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(a=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(a=s,s=i,i={}),e.isFunction(s)&&(a=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=a||i.complete,t}function a(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.10.3",save:function(e,t){for(var s=0;t.length>s;s++)null!==t[s]&&e.data(i+t[s],e[0].style[t[s]])},restore:function(e,s){var a,n;for(n=0;s.length>n;n++)null!==s[n]&&(a=e.data(i+s[n]),a===t&&(a=""),e.css(s[n],a))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),a={width:t.width(),height:t.height()},n=document.activeElement;try{n.id}catch(r){n=document.body}return t.wrap(s),(t[0]===n||e.contains(t[0],n))&&e(n).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(a),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,s,a){return a=a||{},e.each(i,function(e,i){var n=t.cssUnit(i);n[0]>0&&(a[i]=n[0]*s+n[1])}),a}}),e.fn.extend({effect:function(){function t(t){function s(){e.isFunction(n)&&n.call(a[0]),e.isFunction(t)&&t()}var a=e(this),n=i.complete,o=i.mode;(a.is(":hidden")?"hide"===o:"show"===o)?(a[o](),s()):r.call(a[0],i,s)}var i=s.apply(this,arguments),a=i.mode,n=i.queue,r=e.effects.effect[i.effect];return e.fx.off||!r?a?this[a](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):n===!1?this.each(t):this.queue(n||"fx",t)},show:function(e){return function(t){if(a(t))return e.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(e.fn.show),hide:function(e){return function(t){if(a(t))return e.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(e.fn.hide),toggle:function(e){return function(t){if(a(t)||"boolean"==typeof t)return e.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}()})(jQuery);(function(e){var t=/up|down|vertical/,i=/up|left|vertical|horizontal/;e.effects.effect.blind=function(a,s){var n,r,o,l=e(this),h=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(l,a.mode||"hide"),d=a.direction||"up",c=t.test(d),p=c?"height":"width",f=c?"top":"left",m=i.test(d),g={},v="show"===u;l.parent().is(".ui-effects-wrapper")?e.effects.save(l.parent(),h):e.effects.save(l,h),l.show(),n=e.effects.createWrapper(l).css({overflow:"hidden"}),r=n[p](),o=parseFloat(n.css(f))||0,g[p]=v?r:0,m||(l.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[f]=v?o:r+o),v&&(n.css(p,0),m||n.css(f,o+r)),n.animate(g,{duration:a.duration,easing:a.easing,queue:!1,complete:function(){"hide"===u&&l.hide(),e.effects.restore(l,h),e.effects.removeWrapper(l),s()}})}})(jQuery);(function(e){e.effects.effect.bounce=function(t,i){var a,s,n,r=e(this),o=["position","top","bottom","left","right","height","width"],l=e.effects.setMode(r,t.mode||"effect"),h="hide"===l,u="show"===l,d=t.direction||"up",c=t.distance,p=t.times||5,f=2*p+(u||h?1:0),m=t.duration/f,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=r.queue(),_=b.length;for((u||h)&&o.push("opacity"),e.effects.save(r,o),r.show(),e.effects.createWrapper(r),c||(c=r["top"===v?"outerHeight":"outerWidth"]()/3),u&&(n={opacity:1},n[v]=0,r.css("opacity",0).css(v,y?2*-c:2*c).animate(n,m,g)),h&&(c/=Math.pow(2,p-1)),n={},n[v]=0,a=0;p>a;a++)s={},s[v]=(y?"-=":"+=")+c,r.animate(s,m,g).animate(n,m,g),c=h?2*c:c/2;h&&(s={opacity:0},s[v]=(y?"-=":"+=")+c,r.animate(s,m,g)),r.queue(function(){h&&r.hide(),e.effects.restore(r,o),e.effects.removeWrapper(r),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),r.dequeue()}})(jQuery);(function(e){e.effects.effect.clip=function(t,i){var a,s,n,r=e(this),o=["position","top","bottom","left","right","height","width"],l=e.effects.setMode(r,t.mode||"hide"),h="show"===l,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",f={};e.effects.save(r,o),r.show(),a=e.effects.createWrapper(r).css({overflow:"hidden"}),s="IMG"===r[0].tagName?a:r,n=s[c](),h&&(s.css(c,0),s.css(p,n/2)),f[c]=h?n:0,f[p]=h?0:n/2,s.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){h||r.hide(),e.effects.restore(r,o),e.effects.removeWrapper(r),i()}})}})(jQuery);(function(e){e.effects.effect.drop=function(t,i){var a,s=e(this),n=["position","top","bottom","left","right","opacity","height","width"],r=e.effects.setMode(s,t.mode||"hide"),o="show"===r,l=t.direction||"left",h="up"===l||"down"===l?"top":"left",u="up"===l||"left"===l?"pos":"neg",d={opacity:o?1:0};e.effects.save(s,n),s.show(),e.effects.createWrapper(s),a=t.distance||s["top"===h?"outerHeight":"outerWidth"](!0)/2,o&&s.css("opacity",0).css(h,"pos"===u?-a:a),d[h]=(o?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+a,s.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===r&&s.hide(),e.effects.restore(s,n),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e){e.effects.effect.explode=function(t,i){function s(){b.push(this),b.length===d*c&&a()}function a(){p.css({visibility:"visible"}),e(b).remove(),m||p.hide(),i()}var n,r,o,l,h,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),f=e.effects.setMode(p,t.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(n=0;d>n;n++)for(l=g.top+n*y,u=n-(d-1)/2,r=0;c>r;r++)o=g.left+r*v,h=r-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-r*v,top:-n*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:o+(m?h*v:0),top:l+(m?u*y:0),opacity:m?0:1}).animate({left:o+(m?0:h*v),top:l+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s)}})(jQuery);(function(e){e.effects.effect.fade=function(t,i){var s=e(this),a=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:a},{queue:!1,duration:t.duration,easing:t.easing,complete:i})}})(jQuery);(function(e){e.effects.effect.fold=function(t,i){var s,a,n=e(this),r=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"hide"),l="show"===o,h="hide"===o,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=l!==c,f=p?["width","height"]:["height","width"],m=t.duration/2,g={},v={};e.effects.save(n,r),n.show(),s=e.effects.createWrapper(n).css({overflow:"hidden"}),a=p?[s.width(),s.height()]:[s.height(),s.width()],d&&(u=parseInt(d[1],10)/100*a[h?0:1]),l&&s.css(c?{height:0,width:u}:{height:u,width:0}),g[f[0]]=l?a[0]:u,v[f[1]]=l?a[1]:0,s.animate(g,m,t.easing).animate(v,m,t.easing,function(){h&&n.hide(),e.effects.restore(n,r),e.effects.removeWrapper(n),i()})}})(jQuery);(function(e){e.effects.effect.highlight=function(t,i){var s=e(this),a=["backgroundImage","backgroundColor","opacity"],n=e.effects.setMode(s,t.mode||"show"),r={backgroundColor:s.css("backgroundColor")};"hide"===n&&(r.opacity=0),e.effects.save(s,a),s.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(r,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===n&&s.hide(),e.effects.restore(s,a),i()}})}})(jQuery);(function(e){e.effects.effect.pulsate=function(t,i){var s,a=e(this),n=e.effects.setMode(a,t.mode||"show"),r="show"===n,o="hide"===n,l=r||"hide"===n,h=2*(t.times||5)+(l?1:0),u=t.duration/h,d=0,c=a.queue(),p=c.length;for((r||!a.is(":visible"))&&(a.css("opacity",0).show(),d=1),s=1;h>s;s++)a.animate({opacity:d},u,t.easing),d=1-d;a.animate({opacity:d},u,t.easing),a.queue(function(){o&&a.hide(),i()}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,h+1))),a.dequeue()}})(jQuery);(function(e){e.effects.effect.puff=function(t,i){var s=e(this),a=e.effects.setMode(s,t.mode||"hide"),n="hide"===a,r=parseInt(t.percent,10)||150,o=r/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:a,complete:i,percent:n?r:100,from:n?h:{height:h.height*o,width:h.width*o,outerHeight:h.outerHeight*o,outerWidth:h.outerWidth*o}}),s.effect(t)},e.effects.effect.scale=function(t,i){var s=e(this),a=e.extend(!0,{},t),n=e.effects.setMode(s,t.mode||"effect"),r=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===n?0:100),o=t.direction||"both",h=t.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},u={y:"horizontal"!==o?r/100:1,x:"vertical"!==o?r/100:1};a.effect="size",a.queue=!1,a.complete=i,"effect"!==n&&(a.origin=h||["middle","center"],a.restore=!0),a.from=t.from||("show"===n?{height:0,width:0,outerHeight:0,outerWidth:0}:l),a.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},a.fade&&("show"===n&&(a.from.opacity=0,a.to.opacity=1),"hide"===n&&(a.from.opacity=1,a.to.opacity=0)),s.effect(a)},e.effects.effect.size=function(t,i){var s,a,n,r=e(this),o=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(r,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=r.css("position"),y=f?o:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&r.show(),s={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},"toggle"===t.mode&&"show"===p?(r.from=t.to||b,r.to=t.from||s):(r.from=t.from||("show"===p?b:s),r.to=t.to||("hide"===p?b:s)),n={from:{y:r.from.height/s.height,x:r.from.width/s.width},to:{y:r.to.height/s.height,x:r.to.width/s.width}},("box"===m||"both"===m)&&(n.from.y!==n.to.y&&(y=y.concat(d),r.from=e.effects.setTransition(r,d,n.from.y,r.from),r.to=e.effects.setTransition(r,d,n.to.y,r.to)),n.from.x!==n.to.x&&(y=y.concat(c),r.from=e.effects.setTransition(r,c,n.from.x,r.from),r.to=e.effects.setTransition(r,c,n.to.x,r.to))),("content"===m||"both"===m)&&n.from.y!==n.to.y&&(y=y.concat(u).concat(l),r.from=e.effects.setTransition(r,u,n.from.y,r.from),r.to=e.effects.setTransition(r,u,n.to.y,r.to)),e.effects.save(r,y),r.show(),e.effects.createWrapper(r),r.css("overflow","hidden").css(r.from),g&&(a=e.effects.getBaseline(g,s),r.from.top=(s.outerHeight-r.outerHeight())*a.y,r.from.left=(s.outerWidth-r.outerWidth())*a.x,r.to.top=(s.outerHeight-r.to.outerHeight)*a.y,r.to.left=(s.outerWidth-r.to.outerWidth)*a.x),r.css(r.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=o.concat(d).concat(c),r.find("*[width]").each(function(){var i=e(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&e.effects.save(i,l),i.from={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},i.to={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x},n.from.y!==n.to.y&&(i.from=e.effects.setTransition(i,d,n.from.y,i.from),i.to=e.effects.setTransition(i,d,n.to.y,i.to)),n.from.x!==n.to.x&&(i.from=e.effects.setTransition(i,c,n.from.x,i.from),i.to=e.effects.setTransition(i,c,n.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l)})})),r.animate(r.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){0===r.to.opacity&&r.css("opacity",r.from.opacity),"hide"===p&&r.hide(),e.effects.restore(r,y),f||("static"===v?r.css({position:"relative",top:r.to.top,left:r.to.left}):e.each(["top","left"],function(e,t){r.css(t,function(t,i){var s=parseInt(i,10),a=e?r.to.left:r.to.top;return"auto"===i?a+"px":s+a+"px"})})),e.effects.removeWrapper(r),i()}})}})(jQuery);(function(e){e.effects.effect.shake=function(t,i){var s,a=e(this),n=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(a,t.mode||"effect"),o=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===o||"down"===o?"top":"left",p="up"===o||"left"===o,f={},m={},g={},v=a.queue(),y=v.length;for(e.effects.save(a,n),a.show(),e.effects.createWrapper(a),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,a.animate(f,d,t.easing),s=1;l>s;s++)a.animate(m,d,t.easing).animate(g,d,t.easing);a.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===r&&a.hide(),e.effects.restore(a,n),e.effects.removeWrapper(a),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),a.dequeue()}})(jQuery);(function(e){e.effects.effect.slide=function(t,i){var s,a=e(this),n=["position","top","bottom","left","right","width","height"],r=e.effects.setMode(a,t.mode||"show"),o="show"===r,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(a,n),a.show(),s=t.distance||a["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(a).css({overflow:"hidden"}),o&&a.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(o?u?"+=":"-=":u?"-=":"+=")+s,a.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===r&&a.hide(),e.effects.restore(a,n),e.effects.removeWrapper(a),i()}})}})(jQuery);(function(e){e.effects.effect.transfer=function(t,i){var s=e(this),a=e(t.to),n="fixed"===a.css("position"),r=e("body"),o=n?r.scrollTop():0,h=n?r.scrollLeft():0,l=a.offset(),u={top:l.top-o,left:l.left-h,height:a.innerHeight(),width:a.innerWidth()},d=s.offset(),c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top-o,left:d.left-h,height:s.innerHeight(),width:s.innerWidth(),position:n?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i()})}})(jQuery); 
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
 
 /*! jQuery UI - v1.10.3 - 2013-10-20
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */

(function(e){var t=5;e.widget("ui.slider",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,a=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),n="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",r=[];for(i=s.values&&s.values.length||1,a.length>i&&(a.slice(i).remove(),a=a.slice(0,i)),t=a.length;i>t;t++)r.push(n);this.handles=a.add(e(r.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):this.range=e([])},_setupEvents:function(){var e=this.handles.add(this.range).filter("a");this._off(e),this._on(e,this._handleEvents),this._hoverable(e),this._focusable(e)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,a,n,r,o,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),a=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(a>i||a===i&&(t===u._lastChangedValue||u.values(t)===c.min))&&(a=i,n=e(this),r=t)}),o=this._start(t,r),o===!1?!1:(this._mouseSliding=!0,this._handleIndex=r,n.addClass("ui-state-active").focus(),h=n.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-n.width()/2,top:t.pageY-h.top-n.height()/2-(parseInt(n.css("borderTopWidth"),10)||0)-(parseInt(n.css("borderBottomWidth"),10)||0)+(parseInt(n.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,r,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,a,n;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),a=this._valueMax()-this._valueMin(),n=this._valueMin()+s*a,this._trimAlignValue(n)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,a,n;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(a=this.values(),a[t]=i,n=this._trigger("slide",e,{handle:this.handles[t],value:i,values:a}),s=this.values(t?0:1),n!==!1&&this.values(t,i,!0))):i!==this.value()&&(n=this._trigger("slide",e,{handle:this.handles[t],value:i}),n!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(t,i){var s,a,n;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),undefined;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,a=arguments[0],n=0;s.length>n;n+=1)s[n]=this._trimAlignValue(a[n]),this._change(null,n);this._refreshValue()},_setOption:function(t,i){var s,a=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(a=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;a>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,i,s,a,n,r=this.options.range,o=this.options,h=this,l=this._animateOff?!1:o.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,o.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:o.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},o.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:o.animate}))),t=i}):(s=this.value(),a=this._valueMin(),n=this._valueMax(),i=n!==a?100*((s-a)/(n-a)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,o.animate),"min"===r&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},o.animate),"max"===r&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:o.animate}),"min"===r&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},o.animate),"max"===r&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:o.animate}))},_handleEvents:{keydown:function(i){var s,a,n,r,o=e(i.target).data("ui-slider-handle-index");switch(i.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(i.target).addClass("ui-state-active"),s=this._start(i,o),s===!1))return}switch(r=this.options.step,a=n=this.options.values&&this.options.values.length?this.values(o):this.value(),i.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(a+(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(a-(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(a===this._valueMax())return;n=this._trimAlignValue(a+r);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(a===this._valueMin())return;n=this._trimAlignValue(a-r)}this._slide(i,o,n)},click:function(e){e.preventDefault()},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}})})(jQuery); 
 !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
 
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

 
 function unbindRedirectKeyword()
{
        $('.suggestlandmark').find('a').each(function() {
            if($(this).attr('onclick') == undefined){
                $(this).attr('onclick','return false;');
            }
        })
}
 
 $.fn.autopoint = function (options) {
    var bt = $.browser;
    dialect =  bt.msie?{
        topoffset:3,
            widthoffset:9
    }:bt.mozilla?{
        topoffset:3,
            widthoffset:9
    }:bt.safari?{
        topoffset:0,
            widthoffset:9
    }:bt.opera?{
        topoffset:5,
            widthoffset:9
    }:{
        topoffset:5,
            widthoffset:9
    };
    defaults = {
        url:options.url,
        keyUp : 38,
        keyDown : 40,
        keyEnter : 13,
        listHoverCSS : 'jhover',//提示框列表鼠标悬浮的样式
        tpl : '<div class="list"><div class="word">{name}</div><div class="view">{district_name}</div><input type="hidden" value="{longitude}"><input type="hidden" value="{latitude}"><input type="hidden" value="{id}"></div>',
        submit:options.submit
    };
    $('.dropDiv').remove();
    $('.ldDiv').remove();
    var originalVal = new Array();
    var lastVal = new Array();
    var options = $.extend(defaults, $.extend(dialect, options));
    var dropDiv = $('<div></div>').addClass('dropDiv').appendTo($('.city_wrap'));
    var ldDiv = $('<div></div>').addClass('ldDiv').appendTo($('.city_wrap'));
    var sugDiv = $('.sug').html;
    var cityDomain = $("#selectcitydomain").val();
    var cityId = $("#cityid").val();  
    $(this).unbind('keydown');
    $(this).unbind('keyup');
    $(this).unbind('blur');
    $(this).unbind('click');
    return this.each(function(i){
        var pa = $(this);
        $(this).bind('keydown', function(event){
            if (dropDiv.css('display') != 'none') {//当提示层显示时才对键盘事件处理  
                var currentList = dropDiv.find('.' + options.listHoverCSS);
                if (event.keyCode == options.keyDown) {//如果按的是向下方向键
                    if (currentList.length == 0) {
                        originalVal[i] = $(this).val();//如果提示列表没有一个被选中,则将列表第一个选中

                        /**set hidden value**/
                        //var _logType = "KeyDown-First";
                        var _logType = "";
                        setHiddenValue(getPointWord(dropDiv.find('.list:first').mouseover()),getPointWord(dropDiv.find('.list:first').mouseover()),_logType,getLandMarkId(dropDiv.find('.list:first').mouseover()));
                    } else if (currentList.next().length == 0) {//如果是最后一个被选中,则取消选中,即可认为是输入框被选中 
                        unHoverAll();
                        $(this).val(originalVal[i]);
                    } else {
                        unHoverAll();//将原先选中列的下一列选中
                        if (currentList.next().length != 0){
                            /**set hidden value**/
                            //var _logType = "KeyDown-Next";
                            var _logType = "";
                            setHiddenValue(getPointWord(currentList.next().mouseover()),getPointWord(currentList.next().mouseover()),_logType,getLandMarkId(currentList.next().mouseover()));
                        }
                    }
                    return false;
                } else if (event.keyCode == options.keyUp) {//如果按的是向上方向键 
                    if (currentList.length == 0) {
                        /**set hidden value**/
                        //var _logType = "KeyUp-Last";
                        var _logType = "";
                        setHiddenValue(getPointWord(dropDiv.find('.list:last').mouseover()),getPointWord(dropDiv.find('.list:last').mouseover()),_logType,getLandMarkId(dropDiv.find('.list:last').mouseover()));

                        originalVal[i] = $(this).val();
                    } else if (currentList.prev().length == 0) {                                    
                        unHoverAll();
                        $(this).val(originalVal[i]);
                    } else {
                        unHoverAll();
                        if (currentList.prev().length != 0){
                            /**set hidden value**/
                            //var _logType = "KeyUp-Prev";
                            var _logType = "";
                            setHiddenValue(getPointWord(currentList.prev().mouseover()),getPointWord(currentList.prev().mouseover()),_logType,getLandMarkId(currentList.prev().mouseover()));
                        }
                    }
                    return false;
                }else if(event.keyCode == options.keyEnter) {//回车键
              //     if($('#page_op').val()!='Front_Search'){
                    var _logType = "KeyEnter";
                    //setHiddenValue(pa.val(),getPointWord(currentList),getLatitude(currentList),getLongitude(currentList),_logType,getLandMarkId(currentList));
                    if (currentList.length == 0) {
                        originalVal[i] = $(this).val();//如果提示列表没有一个被选中,则将列表第一个选中

                        /**set hidden value**/
                        //var _logType = "KeyDown-First";
                        var _logType = "";
                        setHiddenValue(getPointWord(dropDiv.find('.list:first').mouseover()),getPointWord(dropDiv.find('.list:first').mouseover()),_logType,getLandMarkId(dropDiv.find('.list:first').mouseover()));
                    } else {
                            var _logType = "";
                            setHiddenValue(getPointWord(currentList.mouseover()),getPointWord(currentList.mouseover()),_logType,getLandMarkId(currentList.mouseover()));
                    }
                    $(this).blur();
                    if(moreFilterIsShow) {
                        return false;
                    }
                    if(getPointWord(currentList) == '') {
                    
                    } else {
                        $("#keyword").val();// user set word
                    }
 //                   return;
                    if('undefined' == typeof options.map)
                    {
 //                       setTimeout(function() {searchCity('search')}, 300);
 //                       if(options.submit[i]) {
 //                           $('#'+options.submit[i]).submit();
 //                           return;
 //                       }
                        $('#filter_confirm').click();
                    }
                //  }
                }
            }else if(event.keyCode == options.keyEnter) { 
                if(moreFilterIsShow) {
                    //$('#keywordtype').val('landmark');
                    //$('#keywordvalue').val($('#searchkey').val()+'_'+$('#landmarkid').val()+'S');
                    return false;
                }
                if($(this).val() == '') {
                    window.location = $('#clearKeyWord').val();
                    return false;
                }
                if('undefined' == typeof options.map)
                {
                    $('#filter_confirm').click();
                }
            }
        }).bind('keyup', function(event){
            var currentList = dropDiv.find('.' + options.listHoverCSS);
                if (currentList.length == 0) {
                    if($(this).val() != '') {
                         $('#keyword_search').show();
                        $('#keywordtype').val('landmark');
                        $('#keywordvalue').val($(this).val()+'_M');
                    } else {
                        $('#keywordtype').val('');
                        $('#keywordvalue').val('');
                        $('#search_keyword').hide();
                    }
                }
                
            //输入框值变为空返回
            //if($(this).val() == ''){
            //    dropDiv.empty().hide();
             //   return;
           // 
           // 
            //输入框值没有改变返回
            if ($(this).val() == lastVal[i])
            return;
        //当按键弹起记录输入框值,以方便查看键值有没有变
        lastVal[i] = $(this).val();
        //输入框值变为空返回
        if($(this).val() == ''){
            $('#keyword_search').hide();
            dropDiv.empty().hide();
            setHiddenValue();
            return;
        }
        //如果按下的向上或是向下键,说明在选择
        if(event.keyCode == options.keyUp||event.keyCode == options.keyDown) return;
        //输入框中值有变化,发送请求
        if(!moreFilterIsShow) {
            $('#search_keyword').show();
            $('#remove_keyword').hide();
        }
        getData(pa, $(this).val(), cityDomain);
        }).bind('input', function(event){
            var currentList = dropDiv.find('.' + options.listHoverCSS);
                if (currentList.length == 0) {
                    if($(this).val() != '') {
                        $('#keywordtype').val('landmark');
                        $('#keywordvalue').val($(this).val()+'_M');
                    } else {
                        $('#keywordtype').val('');
                        $('#keywordvalue').val('');
                    }
                }
            //输入框值变为空返回
//            if($(this).val() == ''){
//                dropDiv.empty().hide();
//                return;
//            }
            //输入框值没有改变返回
            if ($(this).val() == lastVal[i])
            return;
        //当按键弹起记录输入框值,以方便查看键值有没有变
        lastVal[i] = $(this).val();
        //输入框值变为空返回
        if($(this).val() == ''){
            $('#keyword_search').hide();
            dropDiv.empty().hide();
            setHiddenValue();
            return;
        }
        //如果按下的向上或是向下键,说明在选择
        if(event.keyCode == options.keyUp||event.keyCode == options.keyDown) return;
        //输入框中值有变化,发送请求
        $('#remove_keyword').hide();
        if(!moreFilterIsShow) {
            $('#remove_keyword').hide();
            $('#search_keyword').show();
        }
        getData(pa, $(this).val(), cityDomain);
        }).bind('blur', function(){
            //输入框失去焦点隐藏提示框,mousedown比blur优先触发所以先处理选择提示框的内容
            //alert("mouser click");
            if($('#page_op').val()=='Front_Search'){
              if($(this).val()==''){
                $(this).val(myWord.keywords);
              }
               $('#keyword_search').hide();
            }else{
              dropDiv.empty().hide();   
            }
        }).bind('focus',function(){
            if($('#page_op').val()=='Front_Search'){
              if($(this).val()==myWord.keywords){
                $(this).val('');
              }
            }
        }); 
        
         $('#keyword_search').click(function(){
              var currentList = dropDiv.find('.' + options.listHoverCSS);
                     if (currentList.length == 0) {
                        originalVal[i] = $(this).val();//如果提示列表没有一个被选中,则将列表第一个选中

                        /**set hidden value**/
                        //var _logType = "KeyDown-First";
                        var _logType = "";
                        setHiddenValue(getPointWord(dropDiv.find('.list:first').mouseover()),getPointWord(dropDiv.find('.list:first').mouseover()),_logType,getLandMarkId(dropDiv.find('.list:first').mouseover()));
                    }  else {
                       // unHoverAll();//将原先选中列的下一列选中
                            /**set hidden value**/
                            //var _logType = "KeyDown-Next";
                            var _logType = "";
                            setHiddenValue(getPointWord(currentList.mouseover()),getPointWord(currentList.mouseover()),_logType,getLandMarkId(currentList.mouseover()));
                    }
                    if(moreFilterIsShow) {
                        return false;
                    }
                    if(getPointWord(currentList) == '') {
                    
                    } else {
                        $("#keyword").val();// user set word
                    }
 //                   return;
                    if('undefined' == typeof options.map)
                    {
 //                       setTimeout(function() {searchCity('search')}, 300);
 //                       if(options.submit[i]) {
 //                           $('#'+options.submit[i]).submit();
 //                           return;
 //                       }
                        $('#filter_confirm').click();
                    }
                 });
        /**处理ajax返回成功的方法**/
        handleResponse = function(parent, json) {
            if(json['data'] == null || json['data'].length == 0) {
                setHiddenValue(parent.val());
                //返回数据为空
                dropDiv.empty().hide();
                return;
            }
            var isEmpty = true;
            for(var o in json){
                if(o == 'data') isEmpty = false;
            }
            if(!json.data[0]) {
                isEmpty = true;
                $(".ldDiv").slideUp("fast");
            }
            if(isEmpty) {
                //showError("返回数据格式错误,请检查请求URL是否正确!");
                dropDiv.empty().hide();
                return;
            }
            refreshDropDiv(parent, json);
            dropDiv.show();
        };
        /**处理ajax失败的方法**/
        handleError = function(error) {
            //showError("请求失败!"+arguments[1]);
        };  
        showError = function(error){  
            alert(error);
        };       
        /**通过ajax返回json格式数据生成用来创建dom的字符串**/
        render = function(parent, json) { 
            try{
                //for result page map
                var res = json['data'] || json; 
                var keyState = 0;
                var appendStr = '';//用json对象中内容替换模版字符串中匹配/\{([a-z]+)\}/ig的内容,如{word},{view} 
                for ( var i = 0; i < res.length; i+=1) {    
                    appendStr += options.tpl.replace(/\{([a-z_]+)\}/ig, function(m, n) {   
                        if(m == "{name}")
                            return res[i][n].substr(0,18).replace(parent.val(),"<font style='color:red;'>"+parent.val()+"</font>"); // 对搜索词飘红
                        else
                            return res[i][n];

                    }); 
                    if(parent.val() == res[i].name){
                        //$("#landmarklat").val(res[i].latitude);
                        //$("#landmarklng").val(res[i].longitude);
                        //$("#landmarkid").val(res[i].id);
                        //keyState = 1;
                        var _logType = "";
                        setHiddenValue(res[i].name,res[i].name,_logType,res[i].id);
                    }
                }; 
                jebind(parent, appendStr,keyState);   
            }catch(e){}
        };      
        /**将新建dom对象插入到提示框中,并重新绑定mouseover事件监听**/  
        jebind = function(parent, a,state) {
            dropDiv.append(a);
            var dropDivHtml = $('#keyword');
            if(state == 0){
                /*判断是否是模糊匹配{{{*/
                if(getLatitude(dropDivHtml) && getLongitude(dropDivHtml)){
                    /**set hidden value**/
                    if(getPointWord(dropDivHtml).indexOf(parent.val()) == 0)
                        var logType = "YNN";
                    else
                        var logType = "NYN";
                    setHiddenValue(parent.val(),getPointWord(dropDivHtml),logType,getLandMarkId(dropDivHtml));
                }
                /*}}}*/
            }else{
                var logType = "";
                setHiddenValue(parent.val(),getPointWord(dropDivHtml),logType,getLandMarkId(dropDivHtml));
            }
            dropDiv.find('.list').each(function() {  
                $(this).unbind('mouseover').mouseover(function() {                          
                    unHoverAll();  
                    $(this).addClass(options.listHoverCSS);                   
                }).unbind('mousedown').mousedown(function(){                                
                    /**set hidden value**/
                    //var _logType = "MouseDown";
                    var _logType = "";
                    setHiddenValue(getPointWord($(this)),getPointWord($(this)),_logType,getLandMarkId($(this)));
                    
                    parent.val(getPointWord($(this)));
                    dropDiv.empty().hide();
                    parent.focus();
                    if(moreFilterIsShow) return false;
                    if('undefined' == typeof options.map)
                    {
                        $('#filter_confirm').click();
                    }
                });
            });
        };
        /**将提示框中所有列的hover样式去掉**/
        unHoverAll = function() {  
            dropDiv.find('.list').each(function() {                         
                $(this).removeClass(options.listHoverCSS); 
            });     
        };   

        setHiddenValue = function(_putSearchKey,_seSearchKey,_type,_lid){
            if(_putSearchKey && _seSearchKey && _lid){

                $("#keyword").val(_putSearchKey);// user set word
                $("#landmarkid").val(_lid);
                $("#log_landmark_type").val(_type);//(Vague:模糊匹配;NotVague:非模糊匹配)
                
                if('NYN' == _type)//模糊匹配
                {
                    $("#searchkey").val("");//api name
                }
                else
                {
                    $("#searchkey").val(_seSearchKey);//api name
                }
            }else if(_putSearchKey && !_seSearchKey){
                $("#searchkey").val("");
                $("#landmarkid").val("");
                $("#log_landmark_type").val("");
            }else{
                $("#searchkey").val("");
                $("#landmarkid").val("");
                $("#log_landmark_type").val("");
            }
            if($("#searchkey").val()) {
                $('#keywordtype').val('landmark');
                $('#keywordvalue').val(_putSearchKey+'_'+_lid+'S');
            } else {
                if(_putSearchKey && _putSearchKey != ' ') {
                    $('#keywordtype').val('landmark');
                    $('#keywordvalue').val(_putSearchKey+'_M');
                }
            }
        }

        /**在提示框中取得当前选中的提示关键字**/   

        getPointWord = function(p) {
            return p.find('div:first').text();   
        };      
        getLatitude = function(p) {
            return p.find('input:eq(1)').val();   
        };      
        getLongitude = function(p) {
            return p.find('input:first').val();   
        };      
        getLandMarkId = function(p) {
            return p.find('input:last').val();   
        };      

        /**刷新提示框,并设定样式**/    

        refreshDropDiv = function(parent, json, serachKey) {   
            var left = parent.offset().left;  
            var height = parent.height();    
            var top = parent.offset().top + options.topoffset + height;    
            //var width = options.width || (parent.width()+options.widthoffset) + 'px';

            dropDiv.empty();
            ldDiv.hide();
            if($(window).width() > 960) {
                dropDiv.css( {
                    'left' : $('#keyword').offset().left,   
                    'top' : $('#keyword').offset().top +40 
                });      
            }
            else {
                dropDiv.css( {
                    'left' : $('#keyword').offset().left,   
                    'top' : $('#keyword').offset().top + $('.head_wrapper').height() +40 
                });      
            }
            render(parent, json);

            //防止ajax返回之前输入框失去焦点导致提示框不消失                
            parent.focus();  
        };      

        /**通过ajax向服务器请求数据**/   

        var date = new Date();
        var rand = Math.floor(Math.random()*10000);
        getData = function(parent, word, city) {  

        setTimeout(function() {
                $.getJSON(options.url, "jsoncallback=?&cityDomain="+city+"&cityId="+cityId+"&searchKey="+encodeURIComponent(word)+"&_t="+rand, function(msg){
                    handleResponse(parent,msg);
                    });
        }, 1);
        };
        /**获取默认地标**/
        getDefaultLandMark = function(parent,cityDomain){
            $.ajax({  
                type : 'POST', 
                url: XZWebUrlWriter.getAjax_GetDefaultLandMarkUrl(cityDomain) ,
                success : function(html){
                    if(html){
                        ldDiv.append(html);
                        unbindRedirectKeyword();
                        var left = parent.offset().left;  
                        var height = parent.height();    
                        if($(window).width() > 960){
                            ldDiv.css( {
                                'left' : $('#keyword').offset().left,   
                                'top' : $('#keyword').offset().top -16  
                            });      
                        }
                        else {
                            ldDiv.css( {
                                'left' : $('#keyword').offset().left,   
                                'top' : $('#keyword').offset().top + $('.head_wrapper').height() -16 
                            });      
                        }
                    ldDiv.show();
                    }
                }  
            });
        };

        $(".ldDiv").focus(function(){
                    $(this).hide();
        });
        /**点击非keyword处,清空.ldDiv层**/
        $(document).click(function(ev){
            ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if (!/^(keyword)|(keyword_icon)|(subway_line)$/.test(target.id) && !$(target).is(".keywords_ul,.keywords_ul *,#subway_line *,.suggestlandmark")) {
                $(".ldDiv").slideUp("fast");
                $(".dropDiv").slideUp("fast");
            }
        });

        $('.ldDiv').on('click','.suggestlandmark li',function(){
            var keywordvalue = $(this).children('a').html();
            $('#keyword').val(keywordvalue);
            $('#keywordvalue').val($(this).attr('keywordvalue'));
            $('#keywordtype').val($(this).attr('keywordtype'));
            if(!moreFilterIsShow)
                $('#filter_confirm').click();
        })
        $('.ldDiv').on('click','.keywords_ul li',function(){
            var liIndex = $('.keywords_ul li').index($(this)); 
            $(this).addClass('key_now');
            $(this).siblings().removeClass('key_now');
            $('div[name="city_keyword"]').hide();
            $('div[name="city_keyword"]').eq(liIndex).show();
        })
        $('.ldDiv').on('click','#subway_line li',function(){ 
            var thisline = $(this).attr('key');
            $(this).addClass('key_now');
            $(this).siblings().removeClass('key_now');
            $('.subway_name_ul li').hide();
            $('.subway_name_ul ').css('margin-top','7px');
            $('.subway_name_ul  li[name="line_'+thisline+'"]').show();
        })
    });
};
function resizeKeyWord()
{
    if($(window).width() > 960){
        $('.ldDiv').css({left:$('#keyword').offset().left,top:($('#keyword').offset().top -16)});
        $('.dropDiv').css({left:$('#keyword').offset().left,top:($('#keyword').offset().top -16)});
    }
    else {
        $('.ldDiv').css({left:$('#keyword').offset().left,top:($('#keyword').offset().top + $('.head_wrapper').height() -16)});
        $('.dropDiv').css({left:$('#keyword').offset().left,top:($('#keyword').offset().top + $('.head_wrapper').height() -16)});
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
 
 

var favoriteObj = {
    nameMaxLen : 16,
    descMaxLen : 200,
    returnMsg  : {rst:true,msg:''}
} 

favoriteObj.getByteLen = function (val) {
    return val.length;
    /*
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var length = val.charCodeAt(i);
        if(length>=0&&length<=128){
            len += 1;
        }else{
            len += 2;
        }
    }
    return len;
    */
}

favoriteObj.initReturnMsg = function(){
    favoriteObj.returnMsg = {rst:true,msg:''};
}


favoriteObj.addCheckName = function(name){
    favoriteObj.initReturnMsg();
    if(!name) {
        favoriteObj.returnMsg.rst = false;
        favoriteObj.returnMsg.msg = '标题不能为空';
        return favoriteObj.returnMsg;
    }
    if(favoriteObj.getByteLen(name) > favoriteObj.nameMaxLen){
        favoriteObj.returnMsg.rst = false;
        favoriteObj.returnMsg.msg = '最多输入8个字或16个字符';
        return favoriteObj.returnMsg;
    }
    return favoriteObj.returnMsg;
}
favoriteObj.addCheckDesc = function(desc){
    favoriteObj.initReturnMsg();
    if(desc && favoriteObj.getByteLen(desc) > favoriteObj.descMaxLen){ 
        favoriteObj.returnMsg.rst = false;
        favoriteObj.returnMsg.msg = '最多输入200个字符';
        return favoriteObj.returnMsg;
    }
    return favoriteObj.returnMsg;
}

favoriteObj.addGroup = function(data){
    return XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxAddFavoriteGroup(),data);
}
favoriteObj.delGroup = function(data){
    return XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxDelFavoriteGroup(),data);
}

favoriteObj.addFavorite = function(data){
    return  XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxAddFavoriteNew(),data);
}
favoriteObj.editFavorite = function(data){
    return  XZWebUrlWriter.postRequest(XZWebUrlWriter.getAjaxEditFavoriteGroup(),data);
}

favoriteObj.delFavorite = function(luId,groupId){
    return  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjaxCancelFavorite(luId,groupId),'json');
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
 
 $(window).load(function() {
    var nationId = $('#nationId').val();
    var abroad = nationId == 0 ? false : true;
    if (abroad) {
        indexCalendar = new execCalendar('#startenddate',{abroad:true,cityName:$('#searchcity').val(),timeZone:$('#timezone').val(),autoSearch:true});
    } else {
        indexCalendar = new execCalendar('#startenddate',{autoSearch:true});
    }
    var timer = 0 ;
    $("#keyword").autopoint({url:'//'+domain+'/ajaxRequest/Ajax_getLandMarkSuggestion',submit:["searchbtn"]});
    $("#searchcityd").suggest('citys',{
        attachObject:'#suggest',
        dataContainer:'#selectcitydomain'
    });

    var displayMore = function(){
        if (document.body.scrollWidth > 1200) {
            $('#moreItem').remove();
            $('#moreItem_box').remove();
            $('.list_li').show();
            $('.position_box').show();

        } else {
            if ($('#moreItem').length > 0) {
                return false;
            }
            var $item = $('.list_li');
            var tmpStr = {};
            var moreFlag = false;
            $.each($item,function(i,e){
                if ($(e).is(':hidden')) {
                    moreFlag = true;
                    tmpStr[$(e).attr('id')] = $(e).text();
                }
            });
            if (moreFlag) {
                var $moreItemObj = $('<li class="list_li" id="moreItem">更多<i></i></li>');
                var $moreBox = $('<div class="position_box" id="moreItem_box"></div>');
                var beforeMoreId = $item.eq(6).attr('id');
                var boxId = beforeMoreId+'_box';
                $moreItemObj.insertAfter('#'+beforeMoreId).show();
                $moreBox.insertAfter('#'+boxId);
                var $moreItem = $('#moreItem');
                var $moreItemBox = $('#moreItem_box');
                var $moreItem_first = $('<div class="line_box" style="display:none"></div>');
                if (!$moreItemBox.find('.line_box').length) {
                    for(var i in tmpStr){
                        var firstId = i+'_one';
                        $moreItem_first.append('<span id="'+firstId+'" style="cursor:pointer;">'+tmpStr[i]+'</span>');
                    }
                    $moreItemBox.append($moreItem_first);
                }
                for(var i in tmpStr){
                    var obj = $('#'+i+'_first');
                    var $sto_box = $('<div class="sto_box" style="display:none"></div>');
                    if (obj.length > 0) {
                        var secondId = i+'_two';
                        var tmpData = obj.find('span').clone();
                        $sto_box.attr('id',secondId).append(tmpData);
                        $moreItemBox.append($sto_box);
                    }
                }
                for(var i in tmpStr){
                    var obj = $('#'+i+'_last');
                    var $third_box = $('<div class="third_box" style="display:none"></div>');
                    if (obj.length > 0) {
                        var thirdId = i+'_third';
                        $third_box.attr('id',thirdId).append(obj.find('span'));
                        $moreItemBox.append($third_box);
                    }
                }

                for(var i in tmpStr){
                    var id = i+'_box';
                    //$('#'+id).remove();
                    $('#'+id).hide();
                }

                var curItemId = 0;
                var $selItem = $('.defcur');
                if($selItem.length > 0){
                    if ($selItem.parent().parent().attr('id') === 'moreItem_box') {
                        if ($('.defcur').parent().attr('id').indexOf('one') !== -1) {
                            curItemId = $('.defcur').parent().attr('id').replace(/_one/,'');
                        } else if ($('.defcur').parent().attr('id').indexOf('two') !== -1) {
                            curItemId = $('.defcur').parent().attr('id').replace(/_two/,'');
                        } else {
                            curItemId = $('.defcur').parent().attr('id').replace(/_third/,'');
                        }
                    }
                }

                $moreItem.on('mouseover',function(e){
                    var $this = $(this);
                    $('.line_box').hide();
                    $('.line_box span').removeClass('cur');
                    $('.sto_box').hide();
                    $('.sto_box span').removeClass('cur');
                    $this.addClass('cur').siblings().removeClass('cur');
                    $moreItemBox.find('.line_box').show();
                    if (curItemId !== 0) {
                        $('#'+curItemId+'_one').addClass('cur');
                        $('.sto_box').hide();
                        if ($('#'+curItemId+'_third').length > 0) {
                            var curLine = $('.defcur').attr('class').split(' ')[0];
                            var curKey = Number(curLine.replace(/line_/,''));
                            var twoTmpObj = $('#'+curItemId+'_two').find('span');
                            $('#'+curItemId+'_two').show();
                            for(var i=0;i<twoTmpObj.length;i++){
                                if (Number(twoTmpObj.eq(i).attr('key')) === curKey) {
                                    twoTmpObj.eq(i).addClass('cur').show();
                                    break;
                                }
                            }
                            $('#'+curItemId+'_third').show();
                            $('#'+curItemId+'_third').find('.'+curLine).show();
                        } else {
                            $('#'+curItemId+'_two').show();
                            $('#'+curItemId+'_two').find('span').show();
                        }
                    } else {
                        $moreItemBox.find('.line_box span').first().addClass('cur');
                        var firstItemId = $moreItemBox.find('.line_box span').first().attr('id').replace(/one/,'two');
                        $('#'+firstItemId).show();
                    }
                });
                $moreItemBox.find('.line_box span').on('click',function(){
                    var $this = $(this);
                    $this.addClass('cur').siblings().removeClass('cur');
                    $moreItemBox.find('.sto_box').hide();
                    var secondId = $this.attr('id').replace(/one/,'two');
                    var thirdId = $this.attr('id').replace(/one/,'third');
                    $('#'+secondId).show();
                    $('.third_box').hide();
                    if ($('#'+thirdId).length > 0) {
                        if ($('#'+thirdId).find('.defcur').length > 0) {
                            var curLine = $('#'+thirdId).find('.defcur').attr('class').split(' ')[0];
                        } else {
                            var curLine = $('#'+thirdId).find('span').eq(0).attr('class');
                        }
                        $('#'+thirdId).show();
                        $('#'+thirdId).find('.'+curLine).show();
                    }
                });
                $moreItemBox.find('.sto_box span').on('click',function(){
                    var $this = $(this);
                    var key = $this.attr('key');
                    $this.addClass('cur').siblings().removeClass('cur');
                    $moreItemBox.find('.third_box').hide();
                    var thirdId = $this.parent().attr('id').replace(/two/,'third');
                    $('#'+thirdId).show();
                    $('#'+thirdId).find('span').filter(':visible').hide();
                    $('#'+thirdId).find('.line_'+key).show();
                });
            }
        }
    }

    displayMore();
    $(window).resize(function(){
        if ($('#moreItem').length > 0) {
            var items = $('#moreItem_box').find('.line_box span');
            for (var i=0;i<items.length;i++) {
                var id = items.eq(i).attr('id').split('_')[0];
                $('#'+id).hide();
            }
        } else {
            var items = $('#moreItem_box').find('.line_box span');
            for (var i=0;i<items.length;i++) {
                var id = items.eq(i).attr('id').split('_')[0];
                $('#'+id).show();
            }
        }
        displayMore();
    });



if($('#searchcityd').val()==''||$('#searchcityd').val()=='无'){
    $('#searchcityd').val($('#searchcity').val());
}
$('.line_box span').each(function(){
    if($(this).hasClass('cur')||$(this).hasClass('defcur')){
        var line_box_id=$(this).parent().attr('id');
        var list_li_id=line_box_id.split('_')[0];
        $('#'+list_li_id).addClass('col_blue');
    }
});
$(document).on('mouseover','.pic_list li',function() {
    var thisLuId = $(this).attr('lodgeunitid');
    var realId = thisLuId.split('_')[1];
    var latlng = $(this).attr('latlng');
    var lat = latlng.split(',')[0];
    var lng = latlng.split(',')[1];
    if($('#'+thisLuId).children().hasClass('site_page') && DetailGMap.GMap === undefined) {
        $('#'+thisLuId).css('top','-336px')
    }
    timer = setTimeout(function() {
        if (DetailGMap.GMap !== undefined) {
            $('.GMapLabel').remove();
            if (DetailGMap.preNewMarker !== null) DetailGMap.preNewMarker.setMap(null);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(Number(lat),Number(lng)),
                map: DetailGMap.GMap,
                icon: '/images/icon_search_room.png'
            });
            DetailGMap.newMarkers.push(marker);
            DetailGMap.preNewMarker = marker;
        }
        $('.site_pop').hide();
        $('#'+thisLuId).find('.maplazyimage').attr('src',$('#'+thisLuId).find('.maplazyimage').attr('lazysrc'));
        $('#'+thisLuId).find('.landlordimage4map').attr('src',$('#'+thisLuId).find('.landlordimage4map').attr('lazysrc'));
        $('#'+thisLuId).show();
        $('#'+thisLuId).find('.icon_logo').siblings().hide();
        $('#'+thisLuId).css('top','-44px');
        $('#'+thisLuId).css('padding','0');
        if (nationId > 0) {
            if($('#mapcheck').val()!=1){
                DetailGMap.GMap.panTo(new google.maps.LatLng(Number(lat),Number(lng)));
            }
        } else {
            if($('#mapcheck').val()!=1){
                DetailBMap.BMap.panTo(new BMap.Point(lng,lat));
            }
        }

    },500);
    //map.getZoom();
})
$(document).on('mouseout','.pic_list li',function() {
    clearTimeout(timer);
    var thisLuId = $(this).attr('lodgeunitid');
    if (DetailGMap.GMap !== undefined) {
        DetailGMap.setMapOnAll(null,DetailGMap.newMarkers);
    }
    setTimeout(function() {
        $('#'+thisLuId).css('top','-326px');
        $('#'+thisLuId).css('padding','5px 5px 80px');
        $('#'+thisLuId).hide();
        $('#'+thisLuId).find('.icon_logo').siblings().show();
    },500);
})
$('#XZMap').on('click','.changeMark',function() {
    var nextMark = $(this).attr('markValue');
    $(this).parent().parent().hide();
    if($('.site_pop[key="'+nextMark+'"]').children().hasClass('site_page')) {
        $('.site_pop[key="'+nextMark+'"]').css('top','-356px')
    }
    $('.site_pop[key="'+nextMark+'"]').find('.maplazyimage').attr('src',$('.site_pop[key="'+nextMark+'"]').find('.maplazyimage').attr('lazysrc'));
    $('.site_pop[key="'+nextMark+'"]').find('.landlordimage4map').attr('src',$('.site_pop[key="'+nextMark+'"]').find('.landlordimage4map').attr('lazysrc'));
    $('.site_pop[key="'+nextMark+'"]').show();
})
$(document).on('click','.lodgeunitname',function(ev) {
    ev = ev || window.event || arguments.callee.caller.arguments[0];
    var target = ev.target || ev.srcElement;
    if($(target).is('.landlordimage') || $(target).parent().is('.site_page')) {

    } else if($(target).is('.commenthref')){
        window.open($(this).attr('detailurl')+'#comment');
    } else {
        window.open($(this).attr('detailurl'));
    }
})
var firstImageHeight =  $('#page_list').find('.pic_list').find('li:first').find('img').height();
__lodgeunitpic = $('#page_list').find('li').find('.lodgeunitpic');
__lodgeunitpic.css('height',firstImageHeight);
$('#icon_removetime').on('click',function() {
    $('#startdate').val('');
    $('#enddate').val('');
    $('#deldatetime').click();
    $('#startenddate').removeClass('col_blue');
    $(this).hide();
    $('#filter_confirm').click();
});
    var select_active = $(".select_active");
    if(select_active.length == 1 && select_active.attr('type')=='danjian'){
        $('#yiju').attr('disabled',true);
    }
})
var myWord={
    keywordmsg:'位置，房间名，或房东名',
    keywords:'位置，房间名，或房东名',
    nokeyword:'',
    cityword:'请选择或输入城市'
};

function decimal (num,v) {
    var vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
}

var totalNum = $('#totalNum').val() ? parseInt($('#totalNum').val()) : 0;
var lowerX = $('#myLowRate').val() ? $('#myLowRate').val() : 0;
var lowerY = $('#myLowPrice').val() ? parseInt($('#myLowPrice').val()) : 0;
var highX = $('#myHighRate').val() ? $('#myHighRate').val() : 0;
var highY = $('#myHighPrice').val() ? parseInt($('#myHighPrice').val()) : 0;
var maxPrice = $('#maxPrice').val() ? parseInt($('#maxPrice').val()) : 0;
var midX = highX - lowerX;
var xLen = maxPrice;
var lowprice = 0;
var highprice = xLen;
var __lowPrice = 0;
var __highPrice = maxPrice;

var lowVal = $('#lowprice').val();
var highVal =  $('#highprice').val();
if(lowVal != 0 || highVal != 0) {
    var leftX1 = localStorage.getItem('leftX1');
    var leftX2 = localStorage.getItem('leftX2');
    if (!leftX1 && !leftX2) {
        window.location = $('#no_price').val();
    }
    var width = leftX2 - leftX1;
    $('.line_all').after('<div class="ui-slider-range ui-widget-header ui-corner-all" style="left: '+leftX1+'%; width: '+width+'%;"></div>');
    lowprice = Number(leftX1*xLen/100);
    highprice = Number(leftX2*xLen/100);
} else {
    $('.line_all').after('<div class="ui-slider-range ui-widget-header ui-corner-all" style="left:0%; width:100%;"></div>');
}
function getPrice(x){
    var price = 0;
    var x = x/xLen;
    if (totalNum >= 100) {
        if (lowerY != highY) {
            if (x < highX) {
                price = Math.ceil(highY / highX * x);
            } else if (x < 1) {
                price = Math.ceil( (maxPrice-highY)*x/(1-highX) + highY  - highX*(maxPrice-highY)/(1-highX) );
            } else {
                price = maxPrice;
            }
        } else {
            if (x <= 0.5) {
                price = Math.ceil(2*lowerY*x);
            } else {
                price = Math.ceil(2*(maxPrice - lowerY)*x + 2*lowerY - maxPrice);
            }
        }
    } else {
       price = Math.ceil(maxPrice*x);
    }
    return price;
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}


$(function() {
    var priceurl = $('#userDefinePrice').attr('defineUrl');
    $("#price-slider").slider({
        range: true,
        min: 0,
        max: xLen,
        step: 1,
        values: [lowprice,highprice],
        slide: function( event, ui ) {
            if(ui.values[0] > ui.values[1]) {
                var minprice = ui.values[0];
                ui.values[0] = ui.values[1];
                ui.values[1] = minprice;
            }
            if(ui.values[0] == ui.values[1]) {
                var price = getPrice(ui.values[0]);
                $("#keyword-price").html('¥'+price);
                __lowPrice = __highPrice = price;
            } else if(ui.values[0] == 0){
                if(ui.values[1] == xLen) {
                    $("#keyword-price").html('不限');
                    __lowPrice = 0;
                    __highPrice = maxPrice;
                } else {
                    var price = getPrice(ui.values[1]);
                    __lowPrice = 0;
                    __highPrice = price;
                    $("#keyword-price").html('¥'+price+'以下');
                }
            } else if(ui.values[1] == xLen){
                var price = getPrice(ui.values[0]);
                __lowPrice = price;
                __highPrice = maxPrice;
                $("#keyword-price").html('¥'+price+'以上');
            } else {
                var price1 = getPrice(ui.values[0]);
                var price2 = getPrice(ui.values[1]);
                __lowPrice = price1;
                __highPrice = price2;

                $("#keyword-price").html('¥'+price1 + '-¥' +price2);
            }
            var left = ui.values[0]/xLen*100;
            var width = (ui.values[1]-ui.values[0])/xLen*100;
            $('.ui-slider-range').css('left',left+'%');
            $('.ui-slider-range').css('width',width+'%');
        },
        change:function() {
            if(!moreFilterIsShow) {
                if(__lowPrice == 0 && __highPrice == maxPrice) {
                    window.location = $('#no_price').val();
                    return false;
                }

                var leftX1 = $('.ui-slider-handle').eq(0).attr('style').substring(6).replace('%;','');
                var leftX2 = $('.ui-slider-handle').eq(1).attr('style').substring(6).replace('%;','');
                localStorage.setItem('leftX1',leftX1);
                localStorage.setItem('leftX2',leftX2);
                setTimeout(function() {
                    priceurl = priceurl.replace(/pricefrom/g, __lowPrice);
                    priceurl = priceurl.replace(/priceto/g, __highPrice);
                    window.location = priceurl;
                },500);
            }
        },
        //stop:function( event, ui ) {
        //    if (ui.value[0] >= ui.values[1]-0.1) {
        //        ui.value[0] = ui.values[1]-0.1
        //    } else {
        //    }
        //}

    });
    //$( "#keyword-price" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
});
var moreFilterIsShow = false;
$('#select_more').click(function() {
    listTop = $(window).scrollTop();
    if(listTop<240){
        if($('#pageNo').val()>1 && listTop>56){
            if($('#list_filter').is(":visible")==true){
                $('#list_filter').hide();
                $('.tj_box').css('top','0px');
                $("#select_more").attr('class','select_up');
                $("#select_more").html("展开筛选条件");
            }else{
                $('#list_filter').show();
                $('#list_filter').css('top','0px');
                $('.tj_box').css('top','230px');
                $("#select_more").attr('class','select_down');
                $("#select_more").html("收起筛选条件");
            }
        }

    }else{

        if($('#list_filter').hasClass('select_bar_fixd')){
            $("#list_filter").removeClass("select_bar_fixd");
            $('.tj_box').css('top','0px');
            $("#select_more").attr('class','select_up');
            $("#select_more").html("展开筛选条件");
            if($('#scrollTopVal').val()>0){
                $(window).scrollTop($('#scrollTopVal').val());
                $('#scrollTopVal').val(0);
            }
        }else{
            if($('#scrollTopVal').val()==0){
                $('#scrollTopVal').val(listTop);
                $(window).scrollTop(listTop-230);
            }
            $("#list_filter").addClass("select_bar_fixd");
            $('#list_filter').css('top','0px');
            $('.tj_box').css('top','230px');
            $("#select_more").attr('class','select_down');
            $("#select_more").html("收起筛选条件");
        }

    }
    indexCalendar = null;
    indexCalendar = new execCalendar('#startenddate',{autoSearch:true});
    unbindRedirectKeyword();
})
$('.rentType').on('click',function() {
    if($(this).hasClass('select_active')) {
        $(this).removeClass('select_active');
    } else {
        $(this).addClass('select_active');
    }
    var rentTypeArr = Array();
    if(!moreFilterIsShow) {
        $('.rentType').each(function() {
            if($(this).hasClass('select_active')) {
                rentTypeArr.push($(this).attr('type'));
            }
        })
        rentTypeArr.sort();
        var rentTypeHerf = rentTypeArr.join('');
        if(rentTypeHerf) {
            for (x in rentTypeArr){
                if(rentTypeArr[x] == 'danjian'){
                    $("input[value='yiju']").attr('checked',false);
                    $('#filter_confirm').click();
                    return false;
                }
            }
            window.location = $('#'+rentTypeHerf).val();
        } else {
            window.location = $('#norenttype').val();
        }
    }
})
var __removeKeyword = false;
$('#remove_keyword').on('click',function() {
    if(moreFilterIsShow) {
        $('#keyword').val('');
        __removeKeyword = true;
        $(this).hide();
    } else {
        window.location = $('#clearKeyWord').val();
    }
})
/*
   $('#remove_fullkey').on('click',function() {
   if(moreFilterIsShow) {
   $('#fulltextkey').val('');
   __removeKeyword = true;
   $(this).hide();
   } else {
   window.location = $('#clearKeyWord').val();
   }
   })*/
$('#search_keyword').on('click',function() {
    if($('#keyword').val() == '' || $('#keyword').val()==myWord.keywordmsg) {
        //window.location = $('#clearKeyWord').val();
    } else {
        $('#filter_confirm').click();
    }
})
function submit_by_attr(){
    $('#filter_confirm').click();
}
$('#filter_confirm').click(function() {
    var partner = $('#partner').val();
    var startDate = $('#startdate').val();
    var endDate = $('#enddate').val();
    var pageNo = $('#pageNo').val();

    var keywords = $('#keyword').val();

    var houseTypeCheckBox = $('#housetyperoomcnt').find('input');
    var checkedHouseType = '';
    checkedHouseType = joinFilterSearchConditions(houseTypeCheckBox,checkedHouseType);

    var facilitiesCheckBox = $('#facilities').find('input');
    var checkedfacilities = '';
    checkedfacilities = joinFilterSearchConditions(facilitiesCheckBox,checkedfacilities);

    var rentTypeCheckBox = $('#rentType').find('li');
    var checkedrentType = '';
    rentTypeCheckBox.each(function() {
        if($(this).hasClass('select_active')) {
            checkedrentType += $(this).attr('type')+'|';
        }
    })
    var guestnum = $('.s_int').attr('key');
   if(guestnum=='未选择'){
       guestnum='';
   }

    if(lowVal == 0 && highVal == 0) {
        var price = '';
    } else {
        var price = lowVal+'-'+highVal+'yuan';
    }

    var abtest_ABTest4SearchDate = getCookie('abtest_ABTest4SearchDate');
    if (abtest_ABTest4SearchDate == 'b') {
        if(startDate == '' && endDate == '') {
            deleteCookie4Search('startDate','/','.'+topLevelDomain);
            deleteCookie4Search('endDate','/','.'+topLevelDomain);
        }
    }
    if(__removeKeyword) {
        var keywordType = '';
        var keywordValue = '';
        var putkey = '';
    } else {
        var keywordType = $('#keywordtype').val();
        var keywordValue = $('#keywordvalue').val();
        if(keywordType == 'district')
        {
            if(!keywordValue) {
                keywordValue = $('#areaPinyin').val();
            }
            var putkey = '';
        } else {
            if(!keywordValue) {
                if($('#keyword').val()&&$('#keyword').val()!=myWord.keywords && $('#keyword').val()!=myWord.nokeyword) {
                    keywordType = 'landmark';
                    keywordValue = $('#keyword').val()+'_M';
                } else {
                    keywordType = '';
                    keywordValue = '';
                }
            }
            if($('#putkey').val()==''&&($('#keyword').val()==''||$('#keyword').val()==myWord.keywords||$('#keyword').val()==myWord.nokeyword)){
                var putkey='';
            }else{

                if($('#keyword').val()==''&&$('#putkey').val()){
                    var putkey = encodeURIComponent($('#putkey').val());
                }else{
                    var putkey = encodeURIComponent($('#keyword').val());
                }

            }
        }
        keywordValue = encodeURIComponent(keywordValue);
    }

    var citydomain = $('#selectcitydomain').val();
    var url = XZWebUrlWriter.getAjax_BuildFilterSearchUrl(partner,startDate,endDate,citydomain,putkey,keywordType,keywordValue,checkedHouseType,checkedfacilities,checkedrentType,guestnum,price);
    var data = XZWebUrlWriter.getRequest(url,'json');
    if(window.location.href == data) {
        // $('#list_filter').css('height','216px');
        //$('.select_bar').show();
        $('.result_wrapper').show();
        moreFilterIsShow = false;
        indexCalendar = null;
        indexCalendar = new execCalendar('#startenddate',{autoSearch:true});
        $(window).css('overflow-y','scroll');
        $(window).scrollTop($(window).scrollTop());
        return false;
    }
    window.location = data;
})
function joinFilterSearchConditions(obj,thischar) {
    obj.each(function() {
        if($(this).is(':checked')) {
            thischar += $(this).val() + '|';
        }
    })
    return thischar;
}

$('#clear_all_select').click(function(){
    var partner = $('#partner').val();
    var startDate='';
    var endDate='';
    var abtest_ABTest4SearchDate = getCookie('abtest_ABTest4SearchDate');
    if (abtest_ABTest4SearchDate == 'b') {
        if(startDate == '' && endDate == '') {
            deleteCookie4Search('startDate','/','.xiaozhu.com');
            deleteCookie4Search('endDate','/','.xiaozhu.com');
        }
    }
    var citydomain = $('#selectcitydomain').val();
    var url = XZWebUrlWriter.getAjax_BuildFilterSearchUrl(partner,'','',citydomain,'','','','','','','','');
    var data = XZWebUrlWriter.getRequest(url,'json');
    if(window.location.href == data) {
        return false;
    }
    window.location = data;
});
$('.list_li').each(function(i){
    var $this = $(this);
    $this.bind('mouseover', function(event){
        $('.third_box').hide()
        $('.line_box').hide();
        $('.line_box span').removeClass('cur');
        var obj = $('.sto_box').filter(':visible');
        if (obj.length > 0) {
            for(var i=0; i<obj.length; i++){
                if (obj.eq(i).attr('id').indexOf('last') != -1) {
                    $('.sto_box').hide();
                }
            }
        }
        $('.sto_box').hide();
        $('.sto_box span').removeClass('cur');
        $this.addClass('cur').siblings().removeClass('cur');
        var id = $this.attr('id');
        var $first = $("#"+id+"_first");
        $first.show();
        var $last = $("#"+id+"_last");
        if($last && $('#subway').val()){
            $first.find('span').each(function(i){
                var $me = $(this);
                if($me.html()==$('#subway').val()){
                    if(!$me.hasClass('cur')){
                        $me.addClass('cur');
                    }
                    var $next = $me.parent().next();
                    $next.show();
                    $next.find('.line_'+$me.attr('key')).siblings().hide();
                    $next.find('.line_'+$me.attr('key')).show();
                    return;
                }else{

                }
            });
        }else{

        }

    });
});
$('.position_tab').hover(function(){
},function(){
    $('.third_box').hide();
    $('.list_li').removeClass('cur');
    $('.line_box').hide();
    $('.line_box span').removeClass('cur');
    $('.sto_box').hide();
    $('.sto_box span').removeClass('cur');
});

$('.line_box span').each(function(i){
    var $this = $(this);
    $this.bind('click', function(event){
        $this.siblings().removeClass('cur').removeClass('defcur');
        for(var i=0; i<$('.sto_box').length; i++){
            if ($('.sto_box').eq(i).attr('id').indexOf('last') != -1) {
                $('.sto_box').eq(i).hide();
            }
        }
        if ($this.parent().attr('id') != 'moreItem_box') {
            $('.sto_box span').hide();
        }
        var id = $this.parent().attr('id').replace('_first','');
        if ($("#"+id+"_last")) {
            $this.addClass('cur');
            if (!$this.attr('keywordtype')) {
                $("#"+id+"_last").show();
            }
        } else {
            $this.addClass('defcur');
        }
        var $next = $this.parent().next();
        if(typeof $this.attr('key')!='undefined'){
            $next.find('.sto_box').show();
            $next.find('.line_'+$this.attr('key')).show();
        }else{

        }
    });
});
$('.sto_box span').each(function(i){
    var $this = $(this);
    $this.bind('click', function(event){
        $this.addClass('cur').siblings().removeClass('defcur');
    });
});

$('#deldatetime').click(function(){
    deleteCookie4Search('startDate','/','.xiaozhu.com');
    deleteCookie4Search('endDate','/','.xiaozhu.com');
});

$('.s_box li').on('click',function(){
    $('.s_box').hide();
    if ($('.s_int').attr('key') != $(this).val()) {
        $('.s_int').val($(this).html());
        $('.s_int').attr('key', $(this).val());
        $('#filter_confirm').click();
    }
});
$('.select_box1').click(function(){
    $('.s_box').show();
});
$(document).on('touchstart', function(ev) {
    ev = ev || window.event || arguments.callee.caller.arguments[0];
    var target = ev.target || ev.srcElement;
    if (!/^(searchcityd)|(cuspricetitle)|(price_custom)|(suggest_icon)|(hotcity)|(a_d)|(e_j)|(k_n)|(p_w)|(x_z)$/.test(target.id) && !$(target).is(".sug * ")) {
        $(".sug").hide();
        $("#cuspricediv").hide();

        if($('#searchcityd').attr('value') == '' && !$('#suggest').is(':visible') && !$('.sug').is(':visible')) {
            $('#searchcityd').attr('value',defaultCity);
            $('#searchcityd').blur();
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
    if (!$(target).is(".s_int")&& !$(target).is('.s_box') && !$(target).is('.s_arrow')&& !$(target).is('.s_box li')) {
          $('.s_box').hide();
    }
});


window.DetailMap = {
    init : function(){
        var nationId = $('#nationId').val();
        //{{{
        if(nationId > 0){
            DetailGMap.init();
        }else{
            DetailBMap.init();
        }
    }//}}}
}

window.DetailBMap = {
    init : function(){
        var that = this;
        if(typeof this.BMap === 'undefined') {
            this.loadJScript();
        }
    },
    loadJScript : function(){
        $('.list_map').height($(window).height()-46);
        var mapKey = '457568d0dbd40f01bbeb6814389edc8e';
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//api.map.baidu.com/api?v=2.0&ak="+mapKey+"&callback=DetailBMap.initMap";
        document.body.appendChild(script);
    },
    initMap : function(){
            if($(window).scrollTop()>240){
                $(window).scrollTop($(window).scrollTop()-1);
            }else if( $('#pageNo').val()<1){
                $(window).scrollTop(1);
            }
            if($('#pageNo').val()>1||$(window).scrollTop()>2){
              var mapInitHeight=$(window).height()-$('.tj_box').height();
            }

            resizeMapHeight(mapInitHeight);

            var city = encodeURIComponent($('#city').val());
            var cityId = $('#cityid').val();
            var landmarklat = $('#landmarklat').val();
            var landmarklng = $('#landmarklng').val();
            var needDistance = $('#putkey').val() ? 1 : 0;
            DetailBMap.BMap = new BMap.Map("XZMap",{enableMapClick:false});            // 创建Map实例
            //添加input checkbox 控件
            if($('#mapcheck').val()==1){
                var new_point=new BMap.Point(landmarklng,landmarklat);
                // var roomdep=map.getZoom();
                DetailBMap.BMap.centerAndZoom(new_point, $('#mapzoom').val());
            }
            function CheckControl(){
                // 默认停靠位置和偏移量
                this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                this.defaultOffset = new BMap.Size(80, 20);;
            }
            CheckControl.prototype = new BMap.Control();
            // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
            // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
            CheckControl.prototype.initialize = function(map){
                // 创建一个DOM元素
                var div = document.createElement("div");
                div.setAttribute("class","map_find");
                var input = document.createElement("input");
                input.type='checkbox';
                // 添加文字说明
                if($('#mapcheck').val()==1){
                    input.checked=true;
                }
                div.appendChild(input);
                div.appendChild(document.createTextNode("拖动地图找房"));
                // 绑定事件
                input.onclick = function(e){
                    if($('#mapcheck').val()==0){
                        $('#mapScrolTop').val($(window).scrollTop());
                        $('#mapcheck').val(1);

                        var cp = DetailBMap.BMap.getCenter();
                        $('#mapzoom').val(map.getZoom());
                        $('#landmarklat').val(cp.lat);
                        $('#landmarklng').val(cp.lng);
                        var bs = map.getBounds();   //获取可视区域
                        var bssw = bs.getSouthWest();   //可视区域左下角
                        var bsne = bs.getNorthEast();   //可视区域右上角
                        var distance = map.getDistance(bssw, bsne).toFixed(0)/2000;
                        $('#radius').val(distance);

                        if($('#keywordcache').val()){
                            var nowUrl=window.location.href;
                            $('.line_box span').each(function(){
                                if($(this).hasClass('defcur')){
                                    $(this).children('a').attr('href',nowUrl);
                                }
                            });

                            $('.line_box span').removeClass('defcur');
                            $('.list_li').removeClass('col_blue');
                            $('.line_box span i').remove();
                            if($('#subway').val()){
                                $('.sto_box span').each(function(){
                                    if($(this).hasClass('defcur')){
                                        $(this).children('a').attr('href',nowUrl);
                                    }
                                });
                                $('#subway').val('');
                                $('.sto_box span').removeClass('defcur');
                                $('.sto_box span i').remove();

                            }
                        }

                    }else{
                        $('#mapcheck').val(0);
                        $('#landmarklat').val('');
                        $('#landmarklng').val('');
                        location.reload();
                        return;
                    }
                    DetailBMap.loadJScript();
                }
                // 添加DOM元素到地图中
                DetailBMap.BMap.getContainer().appendChild(div);
                // 将DOM元素返回
                return div;
            }
            // 创建控件
            var myZoomCtrl = new CheckControl();
            // 添加到地图当中
            DetailBMap.BMap.addControl(myZoomCtrl);
            //添加input checkbox 控件 end

            var startDate = $('#startdate').val(),
                endDate = $('#enddate').val(),
                putkey = $('#keyword').val(),
                district = $('#district').val(),
                landmark = encodeURIComponent($('#landmark4map').val()),
                checkedfacilities = $('#facility').val(),
                checkedrentType = $('#leasetype').val(),
                guestnum = $('#guestnum').val(),
                lowprice = $('#lowprice').val(),
                highprice = $('#highprice').val(),
                pageNo = $('#pageNo').val(),
                mapPageNo=$('#mapPageNo').val(),
                sort = $('#sort').val();

            var houseTypeCheckBox = $('#housetyperoomcnt').find('input');
            if(putkey=='位置，房间名，或房东名'){
                putkey='';
            }
            if($('#landmark4map').val()||$('#keywordcache').val()){
                if($('#mapcheck').val()==1){
                    $('#keyword').val('');
                    $('#remove_keyword').hide();
                    $('#dellandmark').hide();
                    $('#deldistrict').hide();
                    $('#hadSelCondtionsCount').val($('#hadSelCondtionsCount').val()-1);
                    if($('#clear_all_select').is(':visible')){
                        if($('#hadSelCondtionsCount').val()<=2){
                            $('#clear_all_select').hide();
                        }
                    }else if($(window).scrollTop()<246){
                        $('#mapSelectNone').val(1);
                        $('.tj_box').hide();
                        $('.top_line').show();
                    }
                    landmark='';
                }
            }
            if($('#mapcheck').val()==1){
                var radius=$('#radius').val();
                pageNo=mapPageNo;


                DetailBMap.BMap.addEventListener("dragend", function showInfo(){
                    var cp = DetailBMap.BMap.getCenter();
                    $('#landmarklat').val(cp.lat);
                    $('#landmarklng').val(cp.lng);
                    $('#mapPageNo').val(0);
                    var new_point=new BMap.Point(cp.lng,cp.lat);
                    DetailBMap.BMap.centerAndZoom(new_point, $('#mapzoom').val());
                    var bs = DetailBMap.BMap.getBounds();   //获取可视区域
                    var bssw = bs.getSouthWest();   //可视区域左下角
                    var bsne = bs.getNorthEast();   //可视区域右上角
                    bssw.lat=$('#landmarklat').val();
                    bsne.lat=$('#landmarklat').val();
                    var distance = DetailBMap.BMap.getDistance(bssw, bsne).toFixed(0)/2000;
                    $('#radius').val(distance);
                    DetailBMap.BMap.clearOverlays();
                    setTimeout(function () {
                        dragendAndZoomendAjaxHtml();
                    }, 300);


                });

                DetailBMap.BMap.addEventListener("zoomend", function showInfod(){
                    var cp = DetailBMap.BMap.getCenter();
                    $('#landmarklat').val(cp.lat);
                    $('#landmarklng').val(cp.lng);
                    $('#mapzoom').val(DetailBMap.BMap.getZoom());
                    $('#mapPageNo').val(0);
                    var bs = DetailBMap.BMap.getBounds();   //获取可视区域
                    var bssw = bs.getSouthWest();   //可视区域左下角
                    var bsne = bs.getNorthEast();   //可视区域右上角
                    bssw.lat=$('#landmarklat').val();
                    bsne.lat=$('#landmarklat').val();
                    var distance = DetailBMap.BMap.getDistance(bssw, bsne).toFixed(0)/2000;
                    $('#radius').val(distance);
                    DetailBMap.BMap.clearOverlays();
                    pageNo=0;
                    setTimeout(function () {
                        dragendAndZoomendAjaxHtml();
                    },300);

                });
            }else{

            }
            //拖拽事件

            var checkedHouseType = '';
            checkedHouseType = joinFilterSearchConditions(houseTypeCheckBox,checkedHouseType);

            var partner = $('#partner').val();
            if(!landmarklat&&!landmarklng&&$('#mapcheck').val()==1 ){
                var cp = DetailBMap.BMap.getCenter();
                landmarklat=cp.lat;
                landmarklng=cp.lng;
            }
            if($('#mapcheck').val()==1 ){
                district='';
                if(mapPageNo>1){
                    var url = XZWebUrlWriter.getAjax_getDatasMapLodgeunit4Page(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&nationId='+$('nationId').val()+'&needDistance='+needDistance;

                    $(window).scrollTop(241);
                }else{
                    var url = XZWebUrlWriter.getAjax_getDatasMapLodgeunit4Page(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&nationId='+$('nationId').val()+'&needDistance='+needDistance;
                    var html =  XZWebUrlWriter.getRequestSpider('',true,XZWebUrlWriter.getAjax_GetMapDatasLodgeUnit(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&needDistance='+needDistance,'');
                    $('#page_list').empty().html(html);

                    setTimeout(function () {
                        picListAutoHeight();
                    }, 300);
                    if($('#datacount').val()>0){
                        $('#checkfra').show();
                        $('#searchTotal').html($('#datacount').val());
                        $('#searchKeyLandMark').hide();
                        if($('#datacount').val()<=3){
                            $('.lodgeunitpic').attr('src', $('.lodgeunitpic').attr('lazy_src'));
                            $('.landlordimage').attr('src', $('.landlordimage').attr('lazy_src'));
                            resizeMapHeight();
                        }else{

                        }
                        $(document.body).css("overflow-y","scroll");
                    }else{
                        $('#searchTotal').html(0);
                        $('#checkfra').hide();
                        $('.list_adpic').show();
                        var top_left_navigation = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT});  //左上角，添加默认缩放平移控件
                        DetailBMap.BMap.addControl(top_left_navigation);
                        DetailBMap.BMap.enableScrollWheelZoom();                 //启用滚轮放大缩小
                        $('#noLodgeUnitsAtNYN').show();
                        //$(window).scrollTop(2);
                        $(".city_map").removeClass("layer_fixed");
                        if($('#hadSelCondtionsCount').val()>0){
                            $('.tj_box').show();
                            $('.top_line').hide();

                        }else{
                            $('.tj_box').hide();
                            $('.top_line').show();

                        }
                        $('#select_more').hide();
                        resizeMapHeight();
        //                $(document.body).css("overflow","hidden");
                        return;
                    }
                    $('#checkfra').find('a').each(function() {
                        $(this).attr('href','#ongo');
                        $(this).attr('onclick','sortclickfun(this);');
                    });
                    if($(window).scrollTop()>=240 && $('#mapScrolTop').val()>=240){
                        if($(window).scrollTop()==240){
                            $(window).scrollTop(242);
                        }else{
                            $(window).scrollTop(241);
                        }
                    }else{
                        if($(window).scrollTop()>0){
                            $(window).scrollTop($(window).scrollTop()-1);
                        }else{
                            $(window).scrollTop($(window).scrollTop()+1);
                        }
                    }
                }
            }else{
                var url = XZWebUrlWriter.getAjax_GetDatas4Map(partner,startDate,endDate,cityId,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort);
                //resizeMapHeight('');
            }

            //百度地图异步加载开始
            // var data4Map = XZWebUrlWriter.getRequest(url,'json');
             var data4Map = [];
             var nexturl = $('input[name=next]').val();
             XZWebAjax.getSpider('',true, url, {'_':Math.random()}, true, function (datas) {
                data4Map = datas;
                if(data4Map) {
                    for(var i=0;i<data4Map.length;i++){
                        var lat = data4Map[i]['lat'];
                        var lng = data4Map[i]['lng'];
                        var lodgeUnitId = data4Map[i]['lodgeunitid'];
                        var content = data4Map[i]['html'];

                        var point = new BMap.Point(lng,lat);
                        points.push(point);
                        var icon = new BMap.Icon('/images/map_place.png', new BMap.Size(24, 25));
                        var labelOpts = {
                            position : point,
                        };

                        var marker = new BMap.Marker(point, {
                            icon : icon
                        });
                        DetailBMap.BMap.addOverlay(marker);               // 将标注添加到地图中
                        addClickHandler(marker,lodgeUnitId);
                        var defaultLabel = new BMap.Label(content,labelOpts);

                        DetailBMap.BMap.addOverlay(defaultLabel);
                    }
                    if($('#mapcheck').val()!=1){
                        DetailBMap.BMap.setViewport(points);
                    }
                    $('#mapHeightFinish').val(1);
                }
            },'json');
             // $.ajax({
             //    type     : "GET",
             //    url      : url,
             //    dataType : "json",
             //    async    : true,
             //    data     : {'_':Math.random()},
             //    success  : function(datas){
             //       data4Map = datas;
             //       if(data4Map) {
             //       for(var i=0;i<data4Map.length;i++){
             //          var lat = data4Map[i]['lat'];
             //          var lng = data4Map[i]['lng'];
             //          var lodgeUnitId = data4Map[i]['lodgeunitid'];
             //          var content = data4Map[i]['html'];
             //
             //          var point = new BMap.Point(lng,lat);
             //          points.push(point);
             //          var icon = new BMap.Icon('/images/map_place.png', new BMap.Size(24, 25));
             //          var labelOpts = {
             //             position : point,
             //          };
             //
             //          var marker = new BMap.Marker(point, {
             //             icon : icon
             //          });
             //          DetailBMap.BMap.addOverlay(marker);               // 将标注添加到地图中
             //          addClickHandler(marker,lodgeUnitId);
             //          var defaultLabel = new BMap.Label(content,labelOpts);
             //
             //          DetailBMap.BMap.addOverlay(defaultLabel);
             //       }
             //       if($('#mapcheck').val()!=1){
             //          DetailBMap.BMap.setViewport(points);
             //       }
             //       $('#mapHeightFinish').val(1);
             //    }},
             //    beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
             //    error : function (XMLHttpRequest, textStatus, errorThrown){
             //       alert('网络错误,请刷新页面重试:'+textStatus);
             //    }
             // });
            //百度地图异步加载改动结束

            if(landmarklat && landmarklng && $('#mapcheck').val()!=1) {
                var point = new BMap.Point(landmarklng, landmarklat); // 创建点坐标
                var icon = new BMap.Icon('https://'+topLevelDomain+'/images/mapcircleicon.png', new BMap.Size(24, 25),{
                        anchor : new BMap.Size(10, -5)
                        });
                var marker = new BMap.Marker(point, {
                    icon : icon
                });
                DetailBMap.BMap.addOverlay(marker);
                var radiusCircle=$('#radius').val()*1000;
                var circle = new BMap.Circle(point,radiusCircle,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.1});
                DetailBMap.BMap.addOverlay(circle);
            } else {
            }
            var top_left_navigation = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT});  //左上角，添加默认缩放平移控件
            DetailBMap.BMap.addControl(top_left_navigation);
            DetailBMap.BMap.enableScrollWheelZoom();                 //启用滚轮放大缩小

            var opts = {
                width : 280,     // 信息窗口宽度
                height: 310,     // 信息窗口高度
                enableMessage:false//设置允许信息窗发送短息
            };
            var points = Array();

            function dragendAndZoomendAjaxHtml(){

                pageNo=0;
                var checkedHouseType = '';
                checkedHouseType = joinFilterSearchConditions(houseTypeCheckBox,checkedHouseType);

                var partner = $('#partner').val();

                var cp = DetailBMap.BMap.getCenter();
                landmarklat=cp.lat;
                landmarklng=cp.lng;
                radius=$('#radius').val();

                var url = XZWebUrlWriter.getAjax_getDatasMapLodgeunit4Page(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&nationId='+$('nationId').val()+'&needDistance='+needDistance;
                var html =  XZWebUrlWriter.getRequestSpider('',true,XZWebUrlWriter.getAjax_GetMapDatasLodgeUnit(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&needDistance='+needDistance,'');
                $('#page_list').empty().html(html);
                setTimeout(function () {
                    picListAutoHeight();
                }, 1000);
                if($('#datacount').val()>0){
                    $('#checkfra').show();
                    $('#searchTotal').html($('#datacount').val());
                    $('#searchKeyLandMark').hide();
                    if($('#datacount').val()<=3){
                        $('.lodgeunitpic').attr('src', $('.lodgeunitpic').attr('lazy_src'));
                        $('.landlordimage').attr('src', $('.landlordimage').attr('lazy_src'));
                        resizeMapHeight();
                    }else{

                    }
                    $(document.body).css("overflow-y","scroll");
                }else{
                    $('#searchTotal').html(0);
                    $('#checkfra').hide();
                    $('.list_adpic').show();
                    var top_left_navigation = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT});  //左上角，添加默认缩放平移控件
                    DetailBMap.BMap.addControl(top_left_navigation);
                    DetailBMap.BMap.enableScrollWheelZoom();                 //启用滚轮放大缩小
                    $('#noLodgeUnitsAtNYN').show();
                    //$(window).scrollTop(2);
                    $(".city_map").removeClass("layer_fixed");
                    $(".tj_box").removeClass("select_bar_fix");
                    if($('#hadSelCondtionsCount').val()>0){
                        $('.tj_box').show();
                        $('.top_line').hide();
                    }else{
                        $('.tj_box').hide();
                        $('.top_line').show();
                    }
                    $('#select_more').hide();
                    resizeMapHeight();
                   // $(document.body).css("overflow","hidden");

                    //  return;
                }
                $('#checkfra').find('a').each(function() {
                    $(this).attr('href','#ongo');
                    $(this).attr('onclick','sortclickfun(this);');
                });
                if($(window).scrollTop()>=240){
                    if($(window).scrollTop()==240){
                        $(window).scrollTop(241);
                    }else{
                        $(window).scrollTop(240);
                    }
                }else{
                    if($(window).scrollTop()>0){
                        $(window).scrollTop($(window).scrollTop()-1);
                    }else{
                        $(window).scrollTop($(window).scrollTop()+1);
                    }
                }

                var data4Map = XZWebUrlWriter.getRequest(url,'json');
                if(data4Map) {
                    for(var i=0;i<data4Map.length;i++){
                        var lat = data4Map[i]['lat']
                        var lng = data4Map[i]['lng'];
                        var lodgeUnitId = data4Map[i]['lodgeunitid'];
                        var content = data4Map[i]['html'];

                        var point = new BMap.Point(lng,lat);

                        var icon = new BMap.Icon('/images/map_place.png', new BMap.Size(24, 25));
                        var labelOpts = {
                            position : point,
                        };

                        var marker = new BMap.Marker(point, {
                            icon : icon
                        });
                        DetailBMap.BMap.addOverlay(marker);               // 将标注添加到地图中
                        addClickHandler(marker,lodgeUnitId);
                        var defaultLabel = new BMap.Label(content,labelOpts);

                        DetailBMap.BMap.addOverlay(defaultLabel);
                    }
                }
            }
            function addClickHandler(marker,lodgeUnitId){
                marker.addEventListener("click",function(e){
                    var leftoffset = 0;
                    var rightoffset = 0;
                    var topoffset = 0;
                    if(($('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().left - $('#XZMap').offset().left) < 132) {
                        leftoffset = 140 -($('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().left - $('#XZMap').offset().left);
                    }
                    if(($('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().left - $('#XZMap').offset().left + 132) > $('#XZMap').width()) {
                        rightoffset = $('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().left - $('#XZMap').offset().left + 144 - $('#XZMap').width();
                    }
                    if($('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().top-332 < 340) {
                        if($('.tj_box').is(':visible')){
                            var tjBoxHeight=46;
                        }else{
                            var tjBoxHeight=0;
                        }
                        topoffset = 365 - $('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().top + 276+tjBoxHeight;
                    }else if($('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().top-$(window).scrollTop()-46< 340) {
                        topoffset = 340 - $('#lodgeunit_'+lodgeUnitId).parent('.BMapLabel').offset().top +$(window).scrollTop()+ 55;
                    }

                    if(leftoffset != 0) {
                        DetailBMap.BMap.panBy(leftoffset,topoffset);
                    }
                    if(rightoffset != 0) {
                        DetailBMap.BMap.panBy(-rightoffset,topoffset);
                    }
                    if(leftoffset == 0 && rightoffset == 0) {
                        DetailBMap.BMap.panBy(0,topoffset);
                    }
                    $('.site_pop').hide();
                    if($('#lodgeunit_'+lodgeUnitId).children().hasClass('site_page')) {
                        $('#lodgeunit_'+lodgeUnitId).css('top','-356px')
                    }
                    $('#lodgeunit_'+lodgeUnitId).find('.maplazyimage').attr('src',$('#lodgeunit_'+lodgeUnitId).find('.maplazyimage').attr('lazysrc'));
                    $('#lodgeunit_'+lodgeUnitId).find('.landlordimage4map').attr('src',$('#lodgeunit_'+lodgeUnitId).find('.landlordimage4map').attr('lazysrc'));
                    $('#lodgeunit_'+lodgeUnitId).show();
                });
            }
            var Mdatas4Map = '';
            function loadMoreLodgeUnits(count)
            {
                var url = document.URL;
                var putsearchkey = $("#fulltextkey").val();
                if(putsearchkey=='房间名,房东名,或其他更多关键词'){
                    putsearchkey='';
                }
                $.get( '/ajaxRequest/Ajax_doFullTextSearch', {
                        // op:'Ajax_doFullTextSearch',
                        offset:count, url:url
                    },
                    function(data){
                    if(data.length <= 0){
                        $("#fullTextTNo").val(0);
                        if($("#hasFullText").val() == 0) {
                            $("#noLodgeUnits").show();
                        }
                    }else{
                        $("#noLodgeUnits").hide();
                        $("#hasFullText").attr("value",1);
                        $("#fulltextRemind").show();
                        $("#fullTextPutKey").html(putsearchkey);
                    }
                    if(!data && count == 0) {
                        $('#noLodgeUnitsAtNYN').show();
                        if($('.result_foot').length != 0) {
                            $('.result_foot').css('padding-top',$(window).height()-$(".result_foot ").offset().top-$(".result_foot ").height()-33);
                        }
                    }
                    $(data).appendTo(".pic_list");
                    setTimeout(function () {
                        picListAutoHeight();
                    }, 300);
                    if($('#fulltextsearchtotal').val()) {
                        $("#searchTotal").html($('#fulltextsearchtotal').val());
                    } else {
                        $("#searchTotal").html('0');
                    }
                    $(window).scrollTop($(window).scrollTop()+1);
                });
                var url4map = XZWebUrlWriter.getAjax_doFullTextSearch4Map(count,url);
                var data4Map = XZWebUrlWriter.getRequest(url4map,'json');
                Mdatas4Map =data4Map;
                var opts = {
                    width : 280,     // 信息窗口宽度
                    height: 310,     // 信息窗口高度
                    enableMessage:false//设置允许信息窗发送短息
                };
                var mpoints = Array();
                if(data4Map) {
                    for(var i=0;i<data4Map.length;i++){
                        var lat = data4Map[i]['lat'];
                        var lng = data4Map[i]['lng'];
                        var lodgeUnitId = data4Map[i]['lodgeunitid'];
                        var content = data4Map[i]['html'];

                        var point = new BMap.Point(lng,lat);
                        mpoints.push(point);
                        var icon = new BMap.Icon('/images/map_place.png', new BMap.Size(24, 25));
                        var labelOpts = {
                            position : point,
                        };

                        var marker = new BMap.Marker(point, {
                            icon : icon
                        });
                        DetailBMap.BMap.addOverlay(marker);               // 将标注添加到地图中
                        addClickHandler(marker,lodgeUnitId);
                        var defaultLabel = new BMap.Label(content,labelOpts);

                        DetailBMap.BMap.addOverlay(defaultLabel);
                    }
                    DetailBMap.BMap.setViewport(mpoints);
                    $('#mapHeightFinish').val(1);
                }
            }
            if($('#total').val() == 0 && $('#mapcheck').val()!=1) {

                var totalPages = $("#totalPages").val();
                var pageNo = $("#pageNo").val();
                var keyword = $("#fulltextkey").val();
                if(keyword=='房间名,房东名,或其他更多关键词'){
                    keyword='';
                }
                if(totalPages == pageNo)
                {
                    var count = 0;
                    loadMoreLodgeUnits(count);
                    $(window).scroll(function(){
                        if($("#fullTextTNo").val()!=0) {
                            // 当滚动到最底部以上500像素时， 加载新内容
                            if ($(document).height() - $(this).scrollTop()-$(window).height() <= 500)
                            {
                                var fullTextTNo = $("#fullTextTNo").val();
                                if(fullTextTNo != 0)
                                {
                                    count += 24;
                                    loadMoreLodgeUnits(count);
                                }
                            }
                        }
                    });
                }
            }
            if(!data4Map && !Mdatas4Map) {
                DetailBMap.BMap.removeOverlay(circle);
                DetailBMap.BMap.removeOverlay(marker);
                DetailBMap.BMap.centerAndZoom(city,11);
            }

        //}}}
    },

    addLandMark : function(){
        var options = {
            pageCapacity: 20,
            autoViewport: false,
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    var s = [];
                    var ret = [];
                    var datas = [];
                    for(var j = 0; j<results.length; j++){
                        ret = results[j];
                        var iconTag = DetailMap.config[ret.keyword];
                        var wr = ret.wr;
                        for (var i = 0; i < wr.length; i ++){
                             var data = wr[i];
                             if(datas.length == 20) break;
                             if(i >= iconTag.num) break;
                             data.iconTag = iconTag;
                             datas.push(data);
                        }
                    }
                    DetailBMap.pointArrays = {};
                    for (var i = 0; i < datas.length; i ++){
                        var data = datas[i];
                        var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/'+data.iconTag.def, new BMap.Size(40, 50));
                            icon.setImageSize(new BMap.Size(40, 50));
                        var newPoint = new BMap.Point(data.point.lng,data.point.lat);
                        var marker = new BMap.Marker(newPoint,{icon : icon});

                        var key = marker.ba;
                        //var infoParams = {'title': data.title,'offset':{width: 10, height: 10}};
                        //var infoWin = new BMap.InfoWindow(data.address,infoParams);
                        //DetailBMap.infoWindow[key]  = infoWin;
                        DetailBMap.pointArrays[key] = {point : newPoint,icon:data.iconTag};
                        DetailBMap.BMap.addOverlay(marker);
                        DetailBMap.addMarkerAddEventListener(marker);
                        var labelOpts = {
                            position : newPoint,
                        };
                        var defaultLabel = new BMap.Label(DetailBMap.addLabelHtml(key,data.title),labelOpts);

                        DetailBMap.BMap.addOverlay(defaultLabel);
                    }
                }
            }
        };
        var local = new BMap.LocalSearch(DetailBMap.BMap, options);
        //local.search('超市');
        local.searchNearby(['地铁','公交站','餐饮','超市','便利店'],DetailBMap.point,2000);
    },
    addLabelHtml : function(id,content){
        var html = '<div class="icons" id="label_'+id+'">'
            +'<div class="icon_des">'+content
            +'<span class="icon_arrow"></span>'
            +'</div>'
            +'</div>';
        return html;
    },
    addMarkerAddEventListener : function(marker){
        marker.addEventListener("mouseover", function (e) {
            var key = e.currentTarget.ba;
            var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/'+DetailBMap.pointArrays[key].icon.act, new BMap.Size(40, 50));
                icon.setImageSize(new BMap.Size(40, 50));
            this.setIcon(icon);
            //this.openInfoWindow(DetailBMap.infoWindow[key]);
            var leftoffset = 0;
            var rightoffset = 0;
            var topoffset = 0;
            if(($('#label_'+key).parent('.BMapLabel').offset().left - $('#XZMap').offset().left) < 49) {
                leftoffset = $('#label_'+key).parent('.BMapLabel').offset().left - $('#XZMap').offset().left;
            }
            if(($('#label_'+key).parent('.BMapLabel').offset().left - $('#XZMap').offset().left + 45) > $('#XZMap').width()) {
                rightoffset = $('#label_'+key).parent('.BMapLabel').offset().left - $('#XZMap').offset().left-$('#XZMap').width()+90;
            }
            if(($('#label_'+key).parent('.BMapLabel').offset().top - $('#XZMap').offset().top) < 49) {
                topoffset = 99 - ($('#label_'+key).parent('.BMapLabel').offset().top - $('#XZMap').offset().top);
            }

            if(leftoffset != 0) {
                DetailBMap.map.panBy(leftoffset,topoffset);
            }
            if(rightoffset != 0) {
                DetailBMap.map.panBy(-rightoffset,topoffset);
            }
            if(leftoffset == 0 && rightoffset == 0) {
                DetailBMap.map.panBy(0,topoffset);
            }
            $('#label_'+key).show();
        });
        marker.addEventListener("mouseout", function (e) {
            //this.closeInfoWindow();
            var key = e.currentTarget.ba;
            var icon = new BMap.Icon('https://'+topLevelDomain+'/images/detail/'+DetailBMap.pointArrays[key].icon.def, new BMap.Size(40, 50));
                icon.setImageSize(new BMap.Size(40, 50));
            this.setIcon(icon);
            //this.setTop(false);
            $('#label_'+key).hide()
        });
    }
    //}}}
}
window.DetailGMap = {
    markers : [],
    newMarkers : [],
    preNewMarker:null,
    circleObj : null,
    clickMap:null,
    init : function(){
        var that = this;
        if(typeof that.GMap === 'undefined') {
            this.loadJScript();
        }
    },
    loadJScript : function(){
        $('.list_map').height($(window).height()-46);
        var mapKey = 'AIzaSyDQgE7zkdkcCxvl92wQAMBeTiM1Aa8z8NY';
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = '//maps.google.cn/maps/api/js?key='+mapKey+'&libraries=geometry&callback=DetailGMap.initMap';
        document.body.appendChild(script);
    },
    initMap : function () {
        if($(window).scrollTop()>240){
            $(window).scrollTop($(window).scrollTop()-1);
        } else if( $('#pageNo').val()<1){
            $(window).scrollTop(1);
        }
        if($('#pageNo').val()>1||$(window).scrollTop()>2){
            var mapInitHeight=$(window).height()-$('.tj_box').height();
        }
        resizeMapHeight(mapInitHeight);
        var city = encodeURIComponent($('#city').val());
        var cityId = $('#cityid').val();
        var landmarklat = $('#landmarklat').val();
        var landmarklng = $('#landmarklng').val();
        var myLatLng = new google.maps.LatLng(landmarklat,landmarklng);
        var needDistance = $('#putkey').val() ? 1 : 0;
        DetailGMap.GMap = new google.maps.Map(document.getElementById('XZMap'),{
            zoom: 5,
            disableDefaultUI: true,
            /*
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            */
        });

        DetailGMap.mapClickEvent = google.maps.event.addListener(DetailGMap.GMap, 'click', function(event) {
            if (DetailGMap.clickMap) {
                $('.GMapLabel').remove();
                if (DetailGMap.preNewMarker !== null) DetailGMap.preNewMarker.setMap(null);
            } else {
                DetailGMap.clickMap = true;
            }
        });

        if($('#mapcheck').val()==1){
            DetailGMap.GMap.setCenter(new google.maps.LatLng(Number(landmarklat),Number(landmarklng)));
            DetailGMap.GMap.setZoom(Number($('#mapzoom').val()));
        }

        function LeftTopControl(){
            var controlUI = document.createElement('div');
            controlUI.setAttribute("class","map_find");
            controlUI.style.marginLeft = '20px';
            controlUI.style.marginTop = '20px';
            var input = document.createElement("input");
            input.type='checkbox';

            if($('#mapcheck').val()==1){
                input.checked=true;
            }

            controlUI.appendChild(input);
            controlUI.appendChild(document.createTextNode("拖动地图找房"));

            input.onclick = function(e){
                if($('#mapcheck').val()==0){
                    $('#mapScrolTop').val($(window).scrollTop());
                    $('#mapcheck').val(1);
                    var cp = DetailGMap.GMap.getCenter();
                    $('#mapzoom').val(DetailGMap.GMap.getZoom());
                    $('#landmarklat').val(cp.lat());
                    $('#landmarklng').val(cp.lng());
                    var bs = DetailGMap.GMap.getBounds();   //获取可视区域
                    var bssw = bs.getSouthWest();   //可视区域左下角
                    var bsne = bs.getNorthEast();   //可视区域右上角
                    var point1 = new google.maps.LatLng(bssw.lat(),bssw.lng());
                    var point2 = new google.maps.LatLng(bsne.lat(),bsne.lng());
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(point1,point2).toFixed(0)/2000;
                    $('#radius').val(distance);
                    if($('#keywordcache').val()){
                        var nowUrl=window.location.href;
                        $('.line_box span').each(function(){
                            if($(this).hasClass('defcur')){
                                $(this).children('a').attr('href',nowUrl);
                            }
                        });
                        $('.line_box span').removeClass('defcur');
                        $('.list_li').removeClass('col_blue');
                        $('.line_box span i').remove();
                        if($('#subway').val()){
                            $('.sto_box span').each(function(){
                                if($(this).hasClass('defcur')){
                                    $(this).children('a').attr('href',nowUrl);
                                }
                            });
                            $('#subway').val('');
                            $('.sto_box span').removeClass('defcur');
                            $('.sto_box span i').remove();
                        }
                    }
                } else {
                    $('#mapcheck').val(0);
                    $('#landmarklat').val('');
                    $('#landmarklng').val('');
                    location.reload();
                    return;
                }
                DetailGMap.initMap();
            };
            DetailGMap.GMap.controls[google.maps.ControlPosition.LEFT_TOP].push(controlUI);
        }

        LeftTopControl();

        var startDate = $('#startdate').val(),
        endDate = $('#enddate').val(),
        putkey = $('#keyword').val(),
        district = $('#district').val(),
        landmark = encodeURIComponent($('#landmark4map').val()),
        checkedfacilities = $('#facility').val(),
        checkedrentType = $('#leasetype').val(),
        guestnum = $('#guestnum').val(),
        lowprice = $('#lowprice').val(),
        highprice = $('#highprice').val(),
        pageNo = $('#pageNo').val(),
        mapPageNo=$('#mapPageNo').val(),
        sort = $('#sort').val();

        var houseTypeCheckBox = $('#housetyperoomcnt').find('input');
        if(putkey=='位置，房间名，或房东名'){
            putkey='';
        }

        if($('#landmark4map').val()||$('#keywordcache').val()){
            if($('#mapcheck').val()==1){
                $('#keyword').val('');
                $('#remove_keyword').hide();
                $('#dellandmark').hide();
                $('#deldistrict').hide();
                $('#hadSelCondtionsCount').val($('#hadSelCondtionsCount').val()-1);
                if($('#clear_all_select').is(':visible')){
                    if($('#hadSelCondtionsCount').val()<=2){
                        $('#clear_all_select').hide();
                    }
                } else if ($(window).scrollTop()<246){
                    $('#mapSelectNone').val(1);
                    $('.tj_box').hide();
                    $('.top_line').show();
                }
                landmark='';
            }
        }

        if($('#mapcheck').val()==1){
            var radius=$('#radius').val();
            pageNo=mapPageNo;
            DetailGMap.GMap.addListener("dragend",function(){
                var cp = DetailGMap.GMap.getCenter();
                $('#landmarklat').val(cp.lat());
                $('#landmarklng').val(cp.lng());
                $('#mapPageNo').val(0);
                var new_point = new google.maps.LatLng(cp.lat(),cp.lng());
                DetailGMap.GMap.setCenter(new_point);

                var bs = DetailGMap.GMap.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                /*
                var point1 = new google.maps.LatLng(bssw.lat(),bssw.lng());
                var point2 = new google.maps.LatLng(bsne.lat(),bsne.lng());
                */
                var point1 = new google.maps.LatLng(Number($('#landmarklat').val()),bssw.lng());
                var point2 = new google.maps.LatLng(Number($('#landmarklat').val()),bsne.lng());
                var distance = google.maps.geometry.spherical.computeDistanceBetween(point1,point2).toFixed(0)/2000;
                $('#radius').val(distance);
                if (DetailGMap.circleObj != null) circleObj.setMap(null);
                DetailGMap.setMapOnAll(null,DetailGMap.markers);
                setTimeout(function () {
                    dragendAndZoomendAjaxHtml();
                },300);
            });
        }


        function dragendAndZoomendAjaxHtml() {
            pageNo=0;
            var checkedHouseType = '';
            checkedHouseType = joinFilterSearchConditions(houseTypeCheckBox,checkedHouseType);
            var partner = $('#partner').val();
            var cp = DetailGMap.GMap.getCenter();
            landmarklat=cp.lat();
            landmarklng=cp.lng();
            radius=$('#radius').val();
            var url = XZWebUrlWriter.getAjax_getDatasMapLodgeunit4Page(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&nationId='+$('#nationId').val();
            var html =  XZWebUrlWriter.getRequestSpider('',true,XZWebUrlWriter.getAjax_GetMapDatasLodgeUnit(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&needDistance='+needDistance,'');
            $('#page_list').empty().html(html);
            setTimeout(function () {
                picListAutoHeight();
            },1000);
            if($('#datacount').val()>0){
                $('#checkfra').show();
                $('#searchTotal').html($('#datacount').val());
                $('#searchKeyLandMark').hide();
                if($('#datacount').val()<=3){
                    $('.lodgeunitpic').attr('src', $('.lodgeunitpic').attr('lazy_src'));
                    $('.landlordimage').attr('src', $('.landlordimage').attr('lazy_src'));
                    resizeMapHeight();
                }
                $(document.body).css("overflow-y","scroll");
            } else {
                $('#searchTotal').html(0);
                $('#checkfra').hide();
                $('.list_adpic').show();
                $('#noLodgeUnitsAtNYN').show();
                $(".city_map").removeClass("layer_fixed");
                $(".tj_box").removeClass("select_bar_fix");
                if($('#hadSelCondtionsCount').val()>0){
                    $('.tj_box').show();
                    $('.top_line').hide();
                }else{
                    $('.tj_box').hide();
                    $('.top_line').show();
                }
                $('#select_more').hide();
                resizeMapHeight();
            }
            $('#checkfra').find('a').each(function() {
                $(this).attr('href','#ongo');
                $(this).attr('onclick','this.sortclickfun(this);');
            });
            if($(window).scrollTop()>=240){
                if($(window).scrollTop()==240){
                    $(window).scrollTop(241);
                } else {
                    $(window).scrollTop(240);
                }
            }else{
                if($(window).scrollTop()>0){
                    $(window).scrollTop($(window).scrollTop()-1);
                } else {
                    $(window).scrollTop($(window).scrollTop()+1);
                }
            }
            var data4Map = XZWebUrlWriter.getRequest(url,'json');
            if(data4Map) {
                var points = Array();
                for(var i=0;i<data4Map.length;i++){
                    var lat = Number(data4Map[i]['lat']);
                    var lng = Number(data4Map[i]['lng']);
                    var lodgeUnitId = data4Map[i]['lodgeunitid'];
                    var content = data4Map[i]['html'];
                    var point = new google.maps.LatLng(lat,lng);
                    points.push(point);
                    DetailGMap.addMarker(point,content,lodgeUnitId);
                }
            }
        }

        //拖拽事件
        var checkedHouseType = '';
        checkedHouseType = joinFilterSearchConditions(houseTypeCheckBox,checkedHouseType);
        var partner = $('#partner').val();

        if(!landmarklat&&!landmarklng&&$('#mapcheck').val()==1 ){
            var cp = DetailGMap.GMap.getCenter();
            landmarklat=cp.lat();
            landmarklng=cp.lng();
        }

        if ($('#mapcheck').val()==1) {
            district='';
            if(mapPageNo>1){
                var url = XZWebUrlWriter.getAjax_getDatasMapLodgeunit4Page(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&nationId='+$('#nationId').val();
                $(window).scrollTop(241);
            } else {
                var url = XZWebUrlWriter.getAjax_getDatasMapLodgeunit4Page(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&nationId='+$('#nationId').val();
                var html =  XZWebUrlWriter.getRequestSpider('',true,XZWebUrlWriter.getAjax_GetMapDatasLodgeUnit(partner,startDate,endDate,cityId,'',district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&needDistance='+needDistance,'');
                $('#page_list').empty().html(html);
                setTimeout(function () {
                    picListAutoHeight();
                },300);
                if($('#datacount').val()>0){
                    $('#checkfra').show();
                    $('#searchTotal').html($('#datacount').val());
                    $('#searchKeyLandMark').hide();
                    if($('#datacount').val()<=3){
                        $('.lodgeunitpic').attr('src', $('.lodgeunitpic').attr('lazy_src'));
                        $('.landlordimage').attr('src', $('.landlordimage').attr('lazy_src'));
                        resizeMapHeight();
                    }
                    $(document.body).css("overflow-y","scroll");
                } else {
                    $('#searchTotal').html(0);
                    $('#checkfra').hide();
                    $('.list_adpic').show();
                    $('#noLodgeUnitsAtNYN').show();
                    $(".city_map").removeClass("layer_fixed");
                    //筛选条件栏
                    if($('#hadSelCondtionsCount').val()>0){
                        $('.tj_box').show();
                        $('.top_line').hide();
                    } else {
                        $('.tj_box').hide();
                        $('.top_line').show();
                    }
                    $('#select_more').hide();
                    resizeMapHeight();
                    return ;
                }
                //推荐排序
                $('#checkfra').find('a').each(function() {
                   $(this).attr('href','#ongo');
                   $(this).attr('onclick','sortclickfun(this);');
                });
                if($(window).scrollTop()>=240 && $('#mapScrolTop').val()>=240){
                    if ($(window).scrollTop() == 240){
                        $(window).scrollTop(242);
                    } else {
                        $(window).scrollTop(241);
                    }
                } else {
                    if($(window).scrollTop()>0){
                        $(window).scrollTop($(window).scrollTop()-1);
                    } else {
                        $(window).scrollTop($(window).scrollTop()+1);
                    }
                }
            }
        } else {
            var url = XZWebUrlWriter.getAjax_GetDatas4Map(partner,startDate,endDate,cityId,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort)+'&nationId='+$('#nationId').val();
        }

        var data4Map = XZWebUrlWriter.getRequestSpider('',true,url,'json');

        if (landmarklat && landmarklng && $('#mapcheck').val()!=1) {
            var point = new google.maps.LatLng(Number(landmarklat),Number(landmarklng));
            var icon = {
                url:'/images/map_place.png',
                size:new google.maps.Size(24, 25),
                //anchor:new google.maps.Size(10, -5)
            };
            /*
            var maker = new google.maps.Marker({
                position:point,
                icon:icon
            });
            */
            //圆形遮罩
            var radiusCircle = Number($('#radius').val()*1000);
            var circleOpt = {
                center:point,
                fillColor:"blue",
                fillOpacity:0.1,
                strokeWeight:1,
                radius:radiusCircle,
                map:DetailGMap.GMap
            };
            DetailGMap.circleObj = new google.maps.Circle(circleOpt);
        }


        var opts = {
            width : 280,     // 信息窗口宽度
            height: 310,     // 信息窗口高度
            //enableMessage:false//设置允许信息窗发送短息
        };
        if(!isEmptyObject(data4Map)) {
            handleDataToMarker(data4Map);
        }else{
            var count = 0;
            doFullTextSearchLodgeUnits(count);
        }
        function doFullTextSearchLodgeUnits(count)
        {
            var url = document.URL;
            var putsearchkey = $("#fulltextkey").val();
            if(putsearchkey=='房间名,房东名,或其他更多关键词'){
                putsearchkey='';
            }
            var getFullTextUrl = XZWebUrlWriter.getAjax_doFullTextSearchUrl(count, url);
            var data = XZWebUrlWriter.getRequest(getFullTextUrl, 'html');
            if(data.length <= 0){
                $("#fullTextTNo").val(0);
                if($("#hasFullText").val() == 0) {
                    $("#noLodgeUnits").show();
                }
            }else{
                $("#noLodgeUnits").hide();
                $("#hasFullText").attr("value",1);
                $("#fulltextRemind").show();
                $("#fullTextPutKey").html(putsearchkey);
            }
            if(!data && count == 0) {
                $('#noLodgeUnitsAtNYN').show();
                if($('.result_foot').length != 0) {
                    $('.result_foot').css('padding-top',$(window).height()-$(".result_foot ").offset().top-$(".result_foot ").height()-33);
                }
            }

            if(data){
                $(data).appendTo(".pic_list");
                setTimeout(function () {
                    picListAutoHeight();
                }, 300);
                if($('#fulltextsearchtotal').val()) {
                    $("#searchTotal").html($('#fulltextsearchtotal').val());
                } else {
                    $("#searchTotal").html('0');
                }
                $(window).scrollTop($(window).scrollTop()+1);
                var url4map = XZWebUrlWriter.getAjax_doFullTextSearch4Map(count,url);
                var data4Map = XZWebUrlWriter.getRequest(url4map,'json');
                Mdatas4Map =data4Map;
                var opts = {
                    width : 280,     // 信息窗口宽度
                    height: 310,     // 信息窗口高度
                    enableMessage:false//设置允许信息窗发送短息
                };
                var mpoints = Array();
                if(!isEmptyObject(data4Map)) {
                    handleDataToMarker(data4Map);
                }
            }
        };
        function handleDataToMarker(data4Map){
            var points = Array();
            for(var i=0;i<data4Map.length;i++){
                var lat = Number(data4Map[i]['lat']);
                var lng = Number(data4Map[i]['lng']);
                var lodgeUnitId = data4Map[i]['lodgeunitid'];
                var content = data4Map[i]['html'];
                var point = new google.maps.LatLng(lat,lng);
                points.push(point);
                DetailGMap.addMarker(point,content,lodgeUnitId);
            }
            var bounds = new google.maps.LatLngBounds ();
            var  LtLgLen = points.length;
            for (var i = 0; i < LtLgLen; i++) {
                bounds.extend (points[i]);
            }
            DetailGMap.GMap.fitBounds (bounds);
        };
    },
    setMapOnAll : function(map,markers){
        for (var i in markers) {
            markers[i].setMap(map);
        }
    },
    addMarker : function(location,html,lodgeUnitId){

        var LabelMarker = function(map, html, latLng){
            this.map_ = map;
            this.html_ = html;
            this.latLng_ = latLng;
            this.offset_ = {x:i-136,y:-288};
            this.div_ = null;
            this.setMap(map);
        };

        LabelMarker.prototype = new google.maps.OverlayView();

        LabelMarker.prototype.onAdd = function(){
            var div = document.createElement('div');
            div.className = 'GMapLabel';
            div.style.position='absolute';
            div.innerHTML = this.html_;
            this.div_ = div;
            var panes = this.getPanes();
            //panes.overlayLayer.appendChild(div);
            panes.overlayLayer.style['zIndex'] = 10001;
            panes.overlayMouseTarget.appendChild(div);
            DetailGMap.GMap.panTo(new google.maps.LatLng(this.latLng_.lat(),this.latLng_.lng()));
        };

        LabelMarker.prototype.draw = function(){
            var overlayProjection = this.getProjection();
            var latLng = overlayProjection.fromLatLngToDivPixel(this.latLng_);
            var div = this.div_;
            div.style.left = latLng.x + this.offset_.x + 'px';
            div.style.top = latLng.y + this.offset_.y + 'px';
            $(div).find('.lodgeunitname').removeClass('site_pop');
            $(div).find('.lodgeunitname').addClass('site_popg');
        };

        LabelMarker.prototype.onRemove = function(){
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        };

        var marker = new google.maps.Marker({
            position: location,
            map: DetailGMap.GMap,
            icon: '/images/map_place.png'
        });
        DetailGMap.markers.push(marker);
        google.maps.event.addListener(marker, 'click', function(event) {
            $('.GMapLabel').remove();
            if (DetailGMap.preNewMarker !== null) DetailGMap.preNewMarker.setMap(null);

            new LabelMarker(DetailGMap.GMap,html,location);
        });
    },
    clearMarkers : function(){
        setMapOnAll(null);
    },
}

$('.favorite').live('click',function(e){
    DetailGMap.clickMap = false;
    $this = $(this);
    var loginUserid=$('#loginUserId').val();
    var lodgeUnitId=$(this).attr('al');
    if(typeof loginUserid == 'undefined'){
        if($(".region.nation-num")){
            $(".region.nation-num").remove();
        }
        XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},false,
            function(ajaxRsponse){
            if(ajaxRsponse.status == 1){
                $('#input-mobile').after(ajaxRsponse.sucmsg);
            } else {
                alert(ajaxResponse.errmsg);
            }
        });
        XZWebRegByMobileDialog.showRegForm();
    }else{
        if(!$(this).hasClass('sc_ico')){
            var data =  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjaxAddFavoritePage(lodgeUnitId),'html');
            $('.mask').show();
            $('#addFavoritePop').empty().html(data).show();
            var dialog = $("#addFavoritePop");
            dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'relative','z-index' : 8888});
            //dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed','z-index':99999});
            $('#addFavoritePop').css('min-height','0px');
            //$('.ui-widget-overlay').css({position:'fixed'});

            $('#addFavoriteSave').off('click');
            $('#addFavoriteSave').on('click',function(){
                var groupIds =  $('input[name="selectGroup"]');
                var datas = [];

                for(var i in groupIds){
                    if(groupIds[i].checked){
                        datas.push($(groupIds[i]).val());
                    }
                }
                if(!datas.length){
                    alert('请选择收藏分组');
                    return false;
                }
                var postData = {
                    luId : lodgeUnitId,
                    groupIds  : datas
                };

                var rst = favoriteObj.addFavorite(postData);
                if(rst.status == 1){
                    $this.removeClass('wsc_ico').addClass('sc_ico');
                    $this.attr('title','取消收藏');
                    $('#addFavoriteCancel').trigger('click');
                }else{
                    alert(rst.errmsg);
                }
            });
            $('#addFavoriteCancel').off('click');
            $('#addFavoriteCancel').on('click',function(){
                $('#addFavoritePop').hide();
                $('.mask').hide();
            });
            $('#addNewFavoriteGroup').off('click');
            $('#addNewFavoriteGroup').on('click',function(){
                $('#addFavoritePop').hide();
                $('#Pop_mask').show();
                $('#addGroupPop').show();
                $('#addFavoriteGroupPop').show();
                var dialog = $("#addFavoriteGroupPop");
                dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'relative','z-index' : 8888});
                $('.ui-widget-overlay').css({position:'fixed'});
            })
            $('#addGroupCancel').off('click');
            $('#addGroupCancel').on('click',function(){
                $('.tips_msg').hide();
                $('#addGroupPop').hide();
                $('#Pop_mask').hide();
                $('#addFavoritePop').hide();
                $this.trigger('click');
            });
            $('#groupName').keyup(function(){
                $('.tips_msg').hide();
            });

            $('#addGroupSave').off('click');
            $('#addGroupSave').on('click',function(){

                var name = $('#groupName');
                var desc = $('#groupDesc');
                var isprivate =  $('input[name="groupPrivate"]:checked').val();

                var checkName = favoriteObj.addCheckName($.trim(name.val()));
                if(!checkName.rst){
                    $('.tips_msg').html('<i></i>'+checkName.msg).show();
                    return false;
                }
                var checkDesc = favoriteObj.addCheckDesc($.trim(desc.val()));
                if(!checkDesc.rst){
                    return false;
                }
                var data = {
                    groupId : '',
                    name : name.val(),
                    desc : desc.val(),
                    isprivate : isprivate,
                }
                var res = favoriteObj.addGroup(data);
                if(res.status == 1){
                    $this.trigger('click');
                    $('#addGroupPop').hide();
                    $('#Pop_mask').hide();
                }else{
                    alert(res.errmsg);
                }
            });
        }else{
            var data =  XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjaxCancelAllFavorite(lodgeUnitId),'json');
            if(data.status==1){
                $this.removeClass('sc_ico').addClass('wsc_ico');
                $this.attr('title','收藏');
            }
        }
    }
});

$('.favorite').live('mouseover',function(){
    $(document).off( "click", '.lodgeunitname');

})
$('.favorite').live('mouseout',function(){
    $(document).on('click','.lodgeunitname',function(ev) {
        ev = ev || window.event || arguments.callee.caller.arguments[0];
        var target = ev.target || ev.srcElement;
        if($(target).is('.landlordimage') || $(target).parent().is('.site_page')) {

        } else if($(target).is('.commenthref')){
            window.open($(this).attr('detailurl')+'#comment');
        } else {
            window.open($(this).attr('detailurl'));
        }
    })
})

function resizeMapHeight(height_map)
{
    var partner = $('#partner').val();
    if(typeof height_map=='undefined' || height_map==''){
        if(partner == 'lotour') {
            var headerName='.header';
        }else{
            var headerName='.head_wrapper';
        }
        if($('.tj_box').is(':visible')){
            if($(window).scrollTop()>240){
              height_map= $(window).height()-$('.tj_box').height();
            }else{
              height_map= $(window).height()-$(headerName).height()-$('#list_filter').height()-$('.tj_box').height();
            }
        }else{
            height_map= $(window).height()-$(headerName).height()-$('#list_filter').height()-$('.top_line').height();
        }
    }else{
        if($('.search_box').height()<height_map){
            height_map=$('.search_box').height();
        }else if($('.tj_box').is(':visible') && $(window).scrollTop()<=2){
            if(partner == 'lotour') {
                var lotourHeight=$('.header').height();
                height_map=$(window).height()-276-lotourHeight;
            }else{
                height_map=$(window).height()-332;
            }
        } else {
            if (DetailGMap.GMap !== undefined) {
                google.maps.event.trigger(DetailGMap.GMap, 'resize');
            }
        }

    }
    $('.list_map').height(height_map);

}
function picListAutoHeight() {
    var firstImageHeight =  $('#page_list').find('.pic_list').find('li:first').find('img').height();
    $('.lodgeunitpic').each(function(i){
        if(i<9){
            if($(this).attr('lazy_src')=='finish'){
            }else{
                $(this).attr('src',$(this).attr('lazy_src'));
                $(this).attr('lazy_src','finish');

            }
        }
    })
    $('.landlordimage').each(function(i){
        if(i<9){
            if($(this).attr('lazy_src')=='finish'){
            }else{
                $(this).attr('src',$(this).attr('lazy_src'));
                $(this).attr('lazy_src','finish');

            }
        }
    })

    __lodgeunitpic = $('#page_list').find('li').find('.lodgeunitpic');//page_list
    __lodgeunitpic.css('height','auto');
    __lodgeunitpic.css('height',$('#page_list').find('.pic_list').find('li:first').find('img').height());
}

//推荐排序
var sortTitle = {
        undef:'undefined',
        sortup:'点击按价格由低到高排序',
        sortdown:'点击按价格由高到低排序',
        sortzuihaoping:'好评排序',
        zuihaoping:'zuihaoping',
        zuipianyi:'zuipianyi',
        zuigui:'zuigui'
    };

function sortclickfun(str){
    var title = $(str).attr('title');
    switch(title){
        case sortTitle.sortup:
            $('#sort').val(sortTitle.zuipianyi);
            $('.arrow_top').addClass('arrow_top_cur');
            $('.arrow_down').removeClass('arrow_down_cur');
            $(str).attr('title',sortTitle.sortdown)
            $('#defalut_sort').removeClass('col_pink');
            $('#nodefalut_sort').addClass('col_pink');
            $('#haoping_sort').removeClass('col_pink');
            break;
        case sortTitle.sortdown:
            $('#sort').val(sortTitle.zuigui);
            $('.arrow_top').removeClass('arrow_top_cur');
            $('.arrow_down').addClass('arrow_down_cur');
            $(str).attr('title',sortTitle.sortup)
            $('#defalut_sort').removeClass('col_pink');
            $('#nodefalut_sort').addClass('col_pink');
            $('#haoping_sort').removeClass('col_pink');
            break;
        case sortTitle.sortzuihaoping:
            $('#sort').val(sortTitle.zuihaoping);
            $('#nodefalut_sort').removeClass('col_pink');
            $('#defalut_sort').removeClass('col_pink');
            $('#haoping_sort').addClass('col_pink');
            $('.arrow_down').removeClass('arrow_down_cur');
            $('.arrow_top').removeClass('arrow_top_cur');
            break;
        default:
            $('#sort').val('');
            $('#nodefalut_sort').removeClass('col_pink')
            $('#haoping_sort').removeClass('col_pink');
            $('#defalut_sort').addClass('col_pink');
            //  $('#nodefalut_sort').attr('title',sortTitle.sortup)
            $('.arrow_down').removeClass('arrow_down_cur');
            $('.arrow_top').removeClass('arrow_top_cur');
    }
    $('#mapPageNo').val(0);
    getMapDatasPage(1);
}

function getMapDatasPage(pageNo){
    if(typeof(pageNo) == 'undefined') pageNo = 1;
    var city = encodeURIComponent($('#city').val());
    var cityId = $('#cityid').val();
    var landmarklat = $('#landmarklat').val();
    var landmarklng = $('#landmarklng').val();
    var startDate = $('#startdate').val(),
        endDate = $('#enddate').val(),
        putkey = '',
        district = '',
        landmark = '',
        checkedfacilities = $('#facility').val(),
        checkedrentType = $('#leasetype').val(),
        guestnum = $('#guestnum').val(),
        lowprice = $('#lowprice').val(),
        highprice = $('#highprice').val(),
        sort = $('#sort').val();
        needDistance = $('#putkey').val() ? 1 : 0;
    var radius=$('#radius').val();
    var houseTypeCheckBox = $('#housetyperoomcnt').find('input');
    var checkedHouseType = '';
    var partner = $('#partner').val();
    $('#mapPageNo').val(pageNo);
    checkedHouseType = joinFilterSearchConditions(houseTypeCheckBox,checkedHouseType);
    var html =  XZWebUrlWriter.getRequestSpider('',true,XZWebUrlWriter.getAjax_GetMapDatasLodgeUnit(partner,startDate,endDate,cityId,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,landmarklat,landmarklng)+'&needDistance='+needDistance,'');
    if (DetailBMap.BMap !== undefined) {
        DetailBMap.loadJScript();
    } else {
        DetailGMap.initMap();
    }

    $('#page_list').empty().html(html);
    setTimeout(function () {
        picListAutoHeight();
    }, 1000);
}

$(function(){
    DetailMap.init();
    $('.site_popg img').lazyload();
});
 
 $(function(){
    $("img").lazyload(); 
    var mapHeight='';  
    $('#XZMap').on('mousewheel',function(event){
        stopEvent();
        return false;
    })

    if($('#pageNo').val()>1){
        $(window).scrollTop(241);
    }else{
        if($('#hadSelCondtionsCount').val()>0){
            $('.tj_box').show();
            $('.top_line').hide();
            mapHeight=$(window).height()-332;
        }else{
            $('.tj_box').hide(); 
            $('.top_line').show();
            mapHeight=$(window).height()-290;
        }
        $('#select_more').hide();  
//        $(window).scrollTop(0);
    }

    $(window).scroll(function(){
        $('#mapScrolTop').val($(window).scrollTop());
        var partner = $('#partner').val();
        $(".ldDiv").hide();
        $(".dropDiv").hide();
        if(partner == 'lotour') {
            $(".tj_box").addClass("select_bar_fix_lotour");
        }else{
            $(".tj_box").removeClass("select_bar_fix_lotour");
        }
            if($('#scrollTopVal').val()>0 && $(this).scrollTop()>=240){

            }else if($(this).scrollTop()>=240){
                if(partner == 'lotour') {
                    $(".tj_box").addClass("select_bar_fix").addClass("select_bar_fix_lotour");
                } else {
                    $(".tj_box").addClass("select_bar_fix");
                }
                $("#list_filter").removeClass("select_bar_fixd");
                $('#select_more').show();
                $('.tj_box').css('top','0px');
                $('.top_line').hide();
                $(".tj_box").show();

                $(".city_map").addClass("layer_fixed");
                $("#select_more").attr('class','select_up');
                $("#select_more").html("展开筛选条件");
                mapHeight=$(window).height()-46;
            }else if($(this).scrollTop()<240 && $(this).scrollTop()>2){
                $(".tj_box").removeClass("select_bar_fix");
                if(partner == 'lotour') {
                    $(".tj_box").removeClass("select_bar_fix_lotour");
                } else {
                    if($('#hadSelCondtionsCount').val()>0 && $('#mapSelectNone').val()!=1){
                        $('.tj_box').show();
                        $('.top_line').hide();
                        $("#select_more").attr('class','select_down');
                        $("#select_more").html("收起筛选条件");
                    }else{
                        $('.tj_box').hide(); 
                        $('.top_line').show(); 
                    }
                }
                $("#select_more").hide();
                $("#list_filter").show();
                $("#list_filter").removeClass("select_bar_fixd");
                $(".city_map").removeClass("layer_fixed");
                if($('#searchTotal').html()<=3){
                    mapHeight=$('.search_box').height(); 
                }else{
                    if($(this).scrollTop()>240/2){
                        mapHeight=$(window).height()-$(this).scrollTop()+240;
                    }else{
                        mapHeight=$(window).height()-$(this).scrollTop(); 
                    }  
                }
                $('#scrollTopVal').val(0);
            }else{
                $(window).scrollTop(1);  
                $(".city_map").removeClass("layer_fixed");
                $(".tj_box").removeClass("select_bar_fix");
                if($("#hadSelCondtionsCount").val()>0){
                    $(".tj_box").show();
                    $('.top_line').hide();  
                }else{
                    $(".top_line").show();
                    $('.tj_box').hide();  
                }
                $('#scrollTopVal').val(0);
                mapHeight='';
            }

        if($('#searchTotal').html()==0){
            $('#checkfra').hide();
        }
        if($('#mapHeightFinish').val()==1 || $(this).scrollTop()>2){
            resizeMapHeight(mapHeight);
        }
    }); 
    
    //    resizeMapHeight(mapHeight);
})

$(window).resize(function(){
    var ssfuH = $("#facilities").height();
    $("#housetyperoomcnt").css({"height":ssfuH});
})

$('#keywords-input').on({
    focus: function() {
        $('#keyWordsDialog').show();
    },
blur: function() {
    $('#keyWordsDialog').hide();
},
keyup: function() {
    $('#keyWordsDialog').hide();
}
})

$(document).click(function(ev){
    ev = ev || window.event || arguments.callee.caller.arguments[0];
    var target = ev.target || ev.srcElement;
  
    if (!/^(searchcity)|(cuspricetitle)|(price_custom)|(suggest_icon4Search)|(hotcity)|(international_radios)|(radio_form)|(radio_lable_l)|(radio_lable_r)|(radio_r)|(radio_l)|(text-overseas)|(text-inland)|(radio_oversaes_real)|(radio_inland_real)|(showCitySuggestion)|(closeCitySuggestion)|(con_one_1)|(a_d)|(e_j)|(k_n)|(p_w)|(x_z)|(abrd)$/.test(target.id)) {
        if($(target).is("#con_one_1 span")) {
            return false;
        }

        $(".sug").hide();
        $('#showCitySuggestion').css('display','inline-block');
        $('#closeCitySuggestion').hide();
        $("#cuspricediv").hide();
        if($('#searchcity').attr('value') == '' && !$('#suggest').is(':visible') && !$('.sug').is(':visible')) {
            $('#searchcity').attr('value',defaultCity);
        }
    }
    if ( $(target).is(".s_int")||$(target).is(".s_box")||$(target).is('.s_arrow')) {

    }else{
        $(".s_box").hide();
    }
    if (!/^(startenddate)|(calendar_btn_s)|(calendar-box)|(preMonth)|(nextMonth)|(clearSelect)$/.test(target.id) && !$(target).is("#calendar-box,#calendar-box *")) {
        if( $('#startdate').val() !='' && $("#enddate").val() == '') {
            endDateWarn($('#startenddate'));
        }
        else {
            if( $('#startdate').val() =='' && $("#enddate").val() == '') {
                $('#startenddate').val('入住离开日期');
            }
            $("#calendar-box").hide();
        }
    }
    if ( $(target).is(".ui-widget-overlay")) {
        closeDialog();
    }
    var isMap = false;
    while(target)   
    {   
        if($(target).is(".site_pop") || $(target).is('.BMap_Marker') ) {   
            isMap = true;
        }   
        target = target.parentNode;        
    }   
    if(!isMap) $(".site_pop").hide();
});
window.onresize=  function(){
    resizeKeyWord();
    resizeMapHeight();
    $('.lodgeunitpic').each(function(i){
        if(i<9){
            if($(this).attr('lazy_src')=='finish'){
            }else{
                $(this).attr('src',$(this).attr('lazy_src'));
                $(this).attr('lazy_src','finish');
            }
        }           
    });    
    $('.landlordimage').each(function(i){
        if(i<9){
            if($(this).attr('lazy_src')=='finish'){
            }else{
                $(this).attr('src',$(this).attr('lazy_src'));                                                                                                                              
                $(this).attr('lazy_src','finish'); 
            }
        }
    });
    __lodgeunitpic = $('#page_list').find('li').find('.lodgeunitpic');
    __lodgeunitpic.css('height','auto');
    __lodgeunitpic.css('height',$('#page_list').find('.pic_list').find('li:first').find('img').height());

}
function stopEvent(){ //阻止冒泡事件
    //取消事件冒泡 
    var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) { 
        // this code is for Mozilla and Opera
        e.stopPropagation(); 
    } else if (window.event) { 
        // this code is for IE 
        window.event.cancelBubble = true; 
    } 
}
 
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
            numPop=Number(storage.getItem("numPop1"));
            if(!numPop){
                numPop=1;
            }else if(numPop<3){
                numPop=numPop+1;
            }else{
                return false;
            }
            storage.numPop1=numPop;
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