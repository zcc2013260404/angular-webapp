import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public isSearch = false;

  public stype = 'goods';//搜索类型goods商品live直播

  //搜索列表
  public sList: any[] = [];

  public hotwords = [];

  public hiswords = [];

  public keyword = '';

  public pn = 0;

  public isLastPage = true;

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.isloading = true;
    this.route.queryParams.subscribe((data) => {
      this.stype = data.stype;
    });
    if (this.stype == 'goods') {
      this.loadHotGoodsSearch();
      this.loadGoodsHisSearch();
    } else if (this.stype == 'live') {
      this.loadHotLiveSearch();
      this.loadLiveHisSearch();
    }
    this.isloading = false;
  }

  //加载商品热搜
  loadHotGoodsSearch() {
    let api_url = this.common.wx_urlList.loadGoodsHotWord;
    this.common.get(api_url).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let data = response.data;
        this.hotwords = data;
      } else {
        this.common.popToastView(response.msg);
      }
    }).catch(() => {
      this.common.popToastView('网络异常!');
    });
  }

  //加载直播热搜
  loadHotLiveSearch() {
    let api_url = this.common.urlList.loadLiveHotWord;
    this.common.ajaxGet(api_url).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let data = response.data;
        this.hotwords = data;
      } else {
        this.common.popToastView(response.msg);
      }
    }).catch(() => {
      this.common.popToastView('网络异常!');
    });
  }

  //商品历史搜索
  loadGoodsHisSearch() {
    let goodsHisWords = this.store.get('goods_his_words');
    if (goodsHisWords) {
      this.hiswords = goodsHisWords;
    }
  }

  //直播历史搜索
  loadLiveHisSearch() {
    let liveHisWords = this.store.get('live_his_words');
    if (liveHisWords) {
      this.hiswords = liveHisWords;
    }
  }

  //商品搜索关键字放入本地
  setGoodsSearch() {
    let flag = false;
    if (this.hiswords.length > 0) {
      this.hiswords.forEach(element => {
        if (element == this.keyword) {
          flag = true;
          return false;
        }
      });
    }
    if (!flag) {
      var array = [];
      array.push(this.keyword);
      this.hiswords.forEach(element => {
        array.push(element);
      });
      this.hiswords = array;
      this.store.set("goods_his_words", this.hiswords);
    }
  }

  //直播搜索关键字放入本地
  setLiveSearch() {
    let flag = false;
    if (this.hiswords.length > 0) {
      this.hiswords.forEach(element => {
        if (element == this.keyword) {
          flag = true;
          return false;
        }
      });
    }
    if (!flag) {
      var array = [];
      array.push(this.keyword);
      this.hiswords.forEach(element => {
        array.push(element);
      });
      this.hiswords = array;
      this.store.set("live_his_words", this.hiswords);
    }
  }

  clearHisWord() {
    if (this.stype == 'goods') {
      this.store.remove("goods_his_words");
    } else if (this.stype == 'live') {
      this.store.remove("live_his_words");
    }
    this.hiswords = [];
  }

  goBack() {
    this.navController.back();
  }

  search() {
    if (this.stype == 'goods') {
      if (this.keySearch) {
        this.setGoodsSearch();
        this.pn = 0;
        this.searchGoods(null);
      }
    } else if (this.stype == 'live') {
      if (this.keySearch) {
        this.setLiveSearch();
        this.searchLive();
      }
    }
  }

  searchPaper(event) {
    if (this.stype == 'goods') {
      this.searchGoods(event);
    } else if (this.stype == 'live') {

    }
  }

  //商品搜索
  searchGoods(event) {
    this.isloading = true;
    this.pn++;
    let api_url = this.common.wx_urlList.loadGoodsSearch;
    this.common.post(api_url, { 'keyword': this.keyword, 'page': this.pn }).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let rdata = response.data;
        this.isSearch = true;
        if (rdata && rdata.length > 0) {
          this.isLastPage = false;
          this.sList = this.sList.concat(rdata);
        } else {
          if (this.pn > 1) {
            this.isLastPage = true;
          }
        }
      } else {
        this.common.popToastView(response.msg);
      }
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
    }).catch((e) => {
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  //直播搜索
  searchLive() {
    this.isloading = true;
    let api_url = this.common.urlList.loadLiveSearch;
    this.common.ajaxPost(api_url, { "keyword": this.keyword }).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        this.sList = response.data;
      } else {
        this.common.popToastView(response.msg);
      }
      this.isSearch = true;
      this.isloading = false;
    }).catch(() => {
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  keySearch(keyword) {
    this.keyword = keyword;
    this.search();
  }
}
