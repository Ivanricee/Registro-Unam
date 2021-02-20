import { RegistroPage } from './app.po';

describe('registro App', function() {
  let page: RegistroPage;

  beforeEach(() => {
    page = new RegistroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
