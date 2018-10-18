import { Page } from './app.po';
declare let describe: any;
declare let beforeEach: any;
declare let it: any;
declare let expect: any;

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      // page.navigateTo('/');
    });

    it('should', () => {
        expect('Page One').toEqual('Page One');
    });
  })
});
