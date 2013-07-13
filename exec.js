$(document).ready(function(){
	//元の画像が読み込まれたら、その下に画像を表示する
	var img = document.getElementById('orig');
	//origの画像にイベントを追加
	//canvasというタグをすべて取得
	var canvases = document.getElementsByTagName('canvas');
	for (var i=0; i<canvases.length; i++) {
		var c = canvases[i];
		//cの親要素(figureタグ)に戻ってimg要素を複製してcの要素の前に追加します
		c.parentNode.insertBefore(img.cloneNode(true), c);
		c.style.display = 'none';
	}

	// フィルターを実行する
	function runFilter(id, filter, arg1, arg2, arg3) {
		var c = document.getElementById(id); //canvasの要素を取得する
		var s = c.previousSibling.style; //canvasの前にあるimgを表示するかしないか1

		//canvasの前の要素のdisplay属性がnone、表示しないであれば、inlineにして表示します。
		//canvasの結果はnoneで隠す
		//ボタンのテキストをoriginalにする
		if (s.display == 'none') {
			s.display = 'inline';
			c.style.display = 'none';
		} else {
			//idataにフィルタリングした画像の要素が入る
			var idata = Filters.filterImage(filter, img, arg1, arg2, arg3);
			c.width = idata.width;
			c.height = idata.height;
			var ctx = c.getContext('2d');
			ctx.putImageData(idata, 0, 0); //画像を置く
			s.display = 'none';
			c.style.display = 'inline';
		}
	}

	runFilter('grayscale', Filters.grayscale);
	runFilter('brightness', Filters.brightness, 40);
	runFilter('threshold', Filters.threshold, 128);
});
