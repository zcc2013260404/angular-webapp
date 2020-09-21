import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss']
})
export class ShoppingcartPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public allPrice: any = 0.00;
  public ckCount: any = 0;
  public isCheckedAll = false;
  public isEdit = true;    //编辑   
  public data = [];   //购物车数据
  public hasData = false;   //判断购物车是否有数据

  public userInfo: any;// user info

  public timediff = 0;

  constructor(
    public common: CommonService,
    public store: StorageService,
    private statusbarService: StatusbarService,
    public navController: NavController) {
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadTimediff();
    this.loadData();
  }


  loadData() {
    this.data = [];
    if (this.userInfo) {
      let uid = this.userInfo.uid;
      //时间差
      let timedifflong = this.timediff;
      let stime = (new Date().getTime() + timedifflong) + '';
      let sign = this.common.sign({
        'uid': uid,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime
      };
      let api_url = this.common.wx_urlList.loadMyGoodsCarts;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          let rdata = response.data;
          if (rdata) {
            let gdata = rdata.merch_list;
            this.store.set("carInfo", gdata);

            if (gdata) {
              let sdata = [];
              let slist = [];
              let goods = [];
              gdata.forEach(element => {
                slist = element.list;
                goods = [];
                slist.forEach(element2 => {
                  this.hasData = true;
                  let eselected = false;
                  if (element2.selected=="1"){
                    eselected = true;
                  }

                  goods.push({
                    'gsid': element2.id,//商品所在购物车id
                    'gid': element2.goodsid,
                    'gpic': element2.thumb,
                    'gtitle': element2.title,
                    'gprice': element2.marketprice,
                    'gcount': element2.total,
                    'gchecked': eselected
                  });
                });
                if (element.merchname == ""){
                  element.merchname = "微莕直播";
                }

                sdata.push({
                  'sid': element.merchid,
                  'sname': element.merchname,
                  'schecked': false,
                  'goods': goods
                });
              });
              this.data = sdata;
            }
            this.goodsCount(0);
          }
        } else {
          this.common.popToastView(response.msg);
        }
      }).catch((e) => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  loadTimediff() {
    this.timediff = this.common.changeStr(this.store.get("timedifflong"), "0");
  }

  goBack() {
    this.navController.back();
  }

  //加数量
  addNum(sid, gid, gsid) {
    if (this.data) {
      this.data.forEach((element1, index1) => {
        if (element1.sid == sid) {
          if (element1.goods) {
            element1.goods.forEach((element2, index2) => {
              if (element2.gid == gid) {
                let gcount = this.data[index1].goods[index2].gcount;
                this.data[index1].goods[index2].gcount = gcount - 0 + 1;
                this.submitGoodsNum(gsid, gcount - 0 + 1);
                this.goodsCount(0);
                return false;
              }
            });
          }
          return false;
        }
      });
    }
    this.goodsCount(0);
  }

  //减数量
  minusNum(sid, gid, gsid) {
    if (this.data) {
      this.data.forEach((element1, index1) => {
        if (element1.sid == sid) {
          if (element1.goods) {
            element1.goods.forEach((element2, index2) => {
              if (element2.gid == gid) {
                let gcount = this.data[index1].goods[index2].gcount;
                if (gcount > 1) {
                  this.data[index1].goods[index2].gcount = gcount - 0 - 1;
                  this.submitGoodsNum(gsid, gcount - 0 - 1);
                  this.goodsCount(0);
                } else {
                  this.common.popToastView('数量不能再减少咯');
                }
                return false;
              }
            });
          }
          return false;
        }
      });
    }
  }

  //修改数量提交
  submitGoodsNum(gsid, total) {
    if (this.userInfo) {
      let uid = this.userInfo.uid;
      //时间差
      let timedifflong = this.timediff;
      let stime = (new Date().getTime() + timedifflong) + '';
      let sign = this.common.sign({
        'id': gsid,
        'total': total,
        'uid': uid,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'id': gsid,
        'total': total,
        'uid': uid,
        'stime': stime,
        'sign': sign
      };
      let api_url = this.common.wx_urlList.opraGoodsCartNum;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'fail') {
          this.common.popToastView(response.msg);
        }
      }).catch((e) => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  //修改数量提交
  submitGoodsSelect(gsid, total) {
    if (this.userInfo) {
      let uid = this.userInfo.uid;
      //时间差
      let timedifflong = this.timediff;
      let stime = (new Date().getTime() + timedifflong) + '';
      let sign = this.common.sign({
        'id': gsid,
        'total': total,
        'uid': uid,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'id': gsid,
        'total': total,
        'uid': uid,
        'stime': stime,
        'sign': sign
      };
      let api_url = this.common.wx_urlList.opraGoodsCartNum;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'fail') {
          this.common.popToastView(response.msg);
        }
      }).catch((e) => {
        this.common.popToastView('网络异常!');
      });
    }
  }


  storeCount(gid){

    console.log(gid);
    gid.goods.forEach(element =>{
      element.gchecked = gid.schecked;
    });
  }



  //计算总钱数和总数据
  goodsCount(gid) {

      this.ckCount = 0;
      this.allPrice = 0.00;
      let schecked = true;
      if (this.data) {
        this.data.forEach(element1 => {
          if (element1.goods) {
            element1.goods.forEach(element2 => {
              if (element2.gchecked) {
                this.ckCount++;//数量
                this.allPrice = this.allPrice + element2.gprice * element2.gcount;
              } else {
                schecked = false;
              }
            });
            element1.schecked = schecked;
          }
        });
      }
      this.allPrice = this.allPrice.toFixed(2);

    if(gid != 0) {
      let gsid = gid.gsid;
      let select = 0;
      if (gid.gchecked){
        select = 1;
      }
      let uid = this.userInfo.uid;
      //时间差
      let timedifflong = this.timediff;
      let stime = (new Date().getTime() + timedifflong) + '';
      let sign = this.common.sign({
        'id': gsid,
        'uid': uid,
        'select': select,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'id': gsid,
        'uid': uid,
        'select': select,
        'stime': stime,
        'sign': sign
      };
      let api_url = this.common.wx_urlList.selectGoodsCart;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'fail') {
          this.common.popToastView(response.msg);
        }
      }).catch((e) => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  //删除购物车商品
  delGoods() {
    if (this.data) {
      let ids = '';
      let rmdata = [];
      this.data.forEach((element1, index1) => {
        if (element1.goods) {
          element1.goods.forEach((element2, index2) => {
            if (element2.gchecked) {
              if (ids != '') {
                ids = ids + ',' + element2.gsid;
              } else {
                ids = element2.gsid;
              }
              rmdata.push({
                sindex: index1,
                gindex: index2
              });
            }
          });
        }
      });
      if (ids) {
        if (this.userInfo) {
          let uid = this.userInfo.uid;
          //时间差
          let timedifflong = this.timediff;
          let stime = (new Date().getTime() + timedifflong) + '';
          let sign = this.common.sign({
            'ids': ids,
            'uid': uid,
            'stime': stime,
            'salt': this.userInfo.salt//私钥
          });//签名
          let param = {
            'ids': ids,
            'uid': uid,
            'stime': stime,
            'sign': sign
          };
          let api_url = this.common.wx_urlList.delGoodsCartGoods;
          this.common.post(api_url, param).then((response: any) => {
            let code = response.code;
            if (code == 'success') {
              this.loadData();
              // rmdata.forEach(element => {
              //   this.data[element.sindex].goods.splice(element.gindex, 1);
              // });
            } else {
              this.common.popToastView(response.msg);
            }
          }).catch((e) => {
            this.common.popToastView('网络异常!');
          });
        }
      }
    }
  }

  //全选
  checkAll() {
    this.data.forEach((element1, index1) => {
      element1.schecked = this.isCheckedAll;
      // if (element1.goods) {
      //   element1.goods.forEach((element2, index2) => {
      //     this.data[index1].goods[index2].gchecked = this.isCheckedAll;
      //   });
      // }
    });
  }

  //结算
  account() {
    let uid = this.userInfo.uid;
    //时间差
    let timedifflong = this.timediff;
    let stime = (new Date().getTime() + timedifflong) + '';
    let sign = this.common.sign({
      'uid': uid,
      'stime': stime,
      'salt': this.userInfo.salt//私钥
    });//签名
    let param = {
      'uid': uid,
      'stime': stime,
      'sign': sign
    };
    let api_url = this.common.wx_urlList.commitGoodsCart;
    this.common.post(api_url, param).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        console.log(response);
        this.navController.navigateForward('/ordercommit',{queryParams:{type:"shop",isCar:1}});
      } else {
        this.common.popToastView(response.msg);
      }
    }).catch((e) => {
      this.common.popToastView('网络异常!');
    });
  }

}
