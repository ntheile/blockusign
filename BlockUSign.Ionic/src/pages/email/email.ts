import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { EmailService } from './../../services/email.service';
import { BlockStackService } from './../../services/blockstack.service';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
declare let blockstack: any;

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'EmailPage',
  segment: 'email/:guid',
  defaultHistory: ['AnnotatePage', 'HomePage'],

})
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EmailPage {

  email = "";
  lookupId: string;
  user: string;

  githubUsers$: any;
  selectedUsers1 = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    public emailService: EmailService,
    public blockStackService: BlockStackService,
    public chg: ChangeDetectorRef
  ) {


    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
        //this.getFile();
        // @todo in side menu highlight selected doc
      });
    }
    else {
      //this.getFile();
    }

  }


  async ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
    this.lookup();
   
    //this.githubUsers$ = this.blockStackService.getGithubAccounts('anjm');
    this.githubUsers$ = of([
      {
        "login": "ntheile",
        "id": 1273575,
        "avatar_url": "https://avatars3.githubusercontent.com/u/1273575?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/ntheile",
        "html_url": "https://github.com/ntheile",
        "followers_url": "https://api.github.com/users/ntheile/followers",
        "following_url": "https://api.github.com/users/ntheile/following{/other_user}",
        "gists_url": "https://api.github.com/users/ntheile/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/ntheile/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/ntheile/subscriptions",
        "organizations_url": "https://api.github.com/users/ntheile/orgs",
        "repos_url": "https://api.github.com/users/ntheile/repos",
        "events_url": "https://api.github.com/users/ntheile/events{/privacy}",
        "received_events_url": "https://api.github.com/users/ntheile/received_events",
        "type": "User",
        "site_admin": false,
        "score": 65.59707
      },
      {
        "login": "Jesus",
        "id": 23031,
        "avatar_url": "https://avatars1.githubusercontent.com/u/23031?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Jesus",
        "html_url": "https://github.com/Jesus",
        "followers_url": "https://api.github.com/users/Jesus/followers",
        "following_url": "https://api.github.com/users/Jesus/following{/other_user}",
        "gists_url": "https://api.github.com/users/Jesus/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Jesus/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Jesus/subscriptions",
        "organizations_url": "https://api.github.com/users/Jesus/orgs",
        "repos_url": "https://api.github.com/users/Jesus/repos",
        "events_url": "https://api.github.com/users/Jesus/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Jesus/received_events",
        "type": "User",
        "site_admin": false,
        "score": 63.052933
      },
      {
        "login": "postwait",
        "id": 335748,
        "avatar_url": "https://avatars0.githubusercontent.com/u/335748?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/postwait",
        "html_url": "https://github.com/postwait",
        "followers_url": "https://api.github.com/users/postwait/followers",
        "following_url": "https://api.github.com/users/postwait/following{/other_user}",
        "gists_url": "https://api.github.com/users/postwait/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/postwait/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/postwait/subscriptions",
        "organizations_url": "https://api.github.com/users/postwait/orgs",
        "repos_url": "https://api.github.com/users/postwait/repos",
        "events_url": "https://api.github.com/users/postwait/events{/privacy}",
        "received_events_url": "https://api.github.com/users/postwait/received_events",
        "type": "User",
        "site_admin": false,
        "score": 43.323296
      },
      {
        "login": "jfederico",
        "id": 578359,
        "avatar_url": "https://avatars0.githubusercontent.com/u/578359?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jfederico",
        "html_url": "https://github.com/jfederico",
        "followers_url": "https://api.github.com/users/jfederico/followers",
        "following_url": "https://api.github.com/users/jfederico/following{/other_user}",
        "gists_url": "https://api.github.com/users/jfederico/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/jfederico/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/jfederico/subscriptions",
        "organizations_url": "https://api.github.com/users/jfederico/orgs",
        "repos_url": "https://api.github.com/users/jfederico/repos",
        "events_url": "https://api.github.com/users/jfederico/events{/privacy}",
        "received_events_url": "https://api.github.com/users/jfederico/received_events",
        "type": "User",
        "site_admin": false,
        "score": 39.45767
      }
    ]);
    
  }

  next() {
    this.navCtrl.push("SignPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  back() {
    this.navCtrl.push("AnnotatePage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  getUrl() {
    return window.location.href;
  }

  lookup() {
    blockstack.lookupProfile("blockusign1.id")
      .then((profile) => {
        let data = profile;
      })
      .catch((error) => {
        console.log('could not resolve profile')
      })
  }

  async searchUser(user) {
    let resp = await this.blockStackService.searchUser(user);
  }



}
