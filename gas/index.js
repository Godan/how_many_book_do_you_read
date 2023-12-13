
// getリクエストを受けるisbn[]でISBNを受け取る
function doGet(e) {
  var isbnList = e.parameter.isbn.split(',');
  Logger.log(e.parameter);
  Logger.log(isbnList);
  var bookInfoList = getBookInfoList(isbnList);
  var json = JSON.stringify(bookInfoList);
  return ContentService
    .createTextOutput(json);
}

// isbnを複数getで受け取って国会図書館APIに問い合わせする
function getBookInfo(isbn) {
  // https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn%3D%22${isbn}%22&recordPacking=xml&recordSchema=dcndl_simple`);
  var url = `https://iss.ndl.go.jp/api/opensearch?isbn=${isbn}`;
  Logger.log(url);
  var response = UrlFetchApp.fetch(url);
  var xml = XmlService.parse(response.getContentText());
  var nameSpace = XmlService.getNamespace('http://purl.org/dc/elements/1.1/');
  var root = xml.getRootElement();
  var entry = root.getChildren('channel')[0].getChildren('item')[0];
  
  try{
    var title = entry.getChildText('title');
    var author = entry.getChildText('author');
    var publisher = entry.getChildText('publisher');
    var date = entry.getChildText('date');
    var description = entry.getChildText('description');
    // <dc:extent>を取得
    var extent = entry.getChild('extent', nameSpace).getText();
    Logger.log(extent);
    // np ; ncm となっているのでページと厚さ別々で正規表現で取得する
    var extentArray = extent.match(/(\d+)p ; (\d+)cm/);
  }
  catch(e){
    Logger.log(e);
  }

  Logger.log(extentArray);

  
  var bookInfo = {
    title: title,
    author: author,
    publisher: publisher,
    date: date,
    description: description,
    extent: extent,
    page: extentArray ? Number(extentArray[1] || 0 ) : 0,
    thickness:  extentArray ? Number(extentArray[2] || 0) : 0
  };
  console.log(bookInfo);
  return bookInfo;
}

// Path: gas/index.js
function getBookInfoList(isbnList) {
  var bookInfoList = [];
  isbnList.forEach(isbn => {
    var bookInfo = getBookInfo(isbn);
    bookInfoList.push(bookInfo);
  });
  return bookInfoList;
}


			