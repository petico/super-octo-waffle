
/**
 * サムネイル作成
 * @param {int} max_width  最大幅
 * @param {int} max_height 最大高さ
 */
var Thumbnail = function(max_width, max_height){
    this.max_width = max_width;
    this.max_height = max_height;
    this.fix_size = false;
    this.fix_color = "rgb(255,255,255)";
    this.mime_type="image/jpeg";

    /**
     * 画像の表示
     * @param {String} id 画像表示IMGタグのID
     * @param {File} file ファイルクラス
     */
    this.change_thumbanil = function(id, file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            dataUrl = reader.result;
            thumbnail.resizeImage(dataUrl, function(resized_img){
                $("#" + id).attr('src', resized_img);
            })
        };
    }

    /**
     * イメージのリサイズを行います。
     * @param {String} base64image 
     * @param {Function} callback 
     */
    this.resizeImage = function(base64image, callback) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = function(event){
            var dstWidth, dstHeight;
            var x = thumbnail.max_width / this.width;
            var y = thumbnail.max_height / this.height;
            // maxsizeを超えている場合
            if(x < 1 || y < 1){
                if (x < y) {
                    dstWidth = this.width * x;
                    dstHeight = this.height * x;
                } else {
                    dstWidth = this.width * y;
                    dstHeight = this.height * y;
                }    
            }
            if(thumbnail.fix_size){
                canvas.width = thumbnail.max_width;
                canvas.height = thumbnail.max_height;
                ctx.fillStyle = thumbnail.fix_color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }else{
                canvas.width = dstWidth;
                canvas.height = dstHeight;
            }
            
            ctx.drawImage(this, 0, 0, this.width, this.height, (canvas.width - dstWidth) / 2, (canvas.height - dstHeight) / 2, dstWidth, dstHeight);
            callback(canvas.toDataURL(thumbnail.mime_type));
        };
        image.src = base64image;
    };
}

var thumbnail = new Thumbnail(1024, 768);
thumbnail.fix_size = true;
