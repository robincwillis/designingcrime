var bitch = (function(){
	var my_canvas = document.getElementById('canvas');
	var ctx = my_canvas.getContext('2d');
	var canvas_1 = document.createElement( 'canvas' );
	var canvas_2 = document.createElement( 'canvas' );
	var ctx_1 = canvas_1.getContext( '2d' );
	var ctx_2 = canvas_2.getContext( '2d' );
	var base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var base64_map = base64_chars.split( '' );
	var reversed_base64_map = { };
	base64_map.forEach( function ( val, key ) { reversed_base64_map[val] = key; } );
	return {
		glitchImageData : function(image_data, params){
				this.resizeCanvas( canvas_1, image_data );
				this.resizeCanvas( canvas_2, image_data );
				//convert imagedata to base64 string
				var base64 = this.imageDataToBase64(image_data, params.quality);
				//convert base64 string to byte array
				var byte_array = this.base64ToByteArray( base64 );
				//get the header length
				var jpg_header_length = this.getJpegHeaderSize( byte_array );
				//glitch up the array
				for ( var i = 0, len = params.iterations; i < len; i++ )
				{
					this.glitchJpegBytes(
						byte_array,
						jpg_header_length,
						params.seed,
						params.amount,
						i,
						params.iterations
					);

				}

				//byte_array[8000] = Math.floor( 80 );
				//make a new image
				img = new Image();
				img.onload = function ()
				{
					ctx_1.drawImage( img, 0, 0 );
					new_image_data = ctx_1.getImageData( 0, 0, image_data.width, image_data.height );
					ctx.drawImage(img, 0,0);
					//callback( new_image_data );
				};

				img.src = this.byteArrayToBase64( byte_array );
				//convert the byte array back into base64
				//load it into the new image
		},

		glitchJpegBytes : function( byte_array, jpg_header_length, seed, amount, j, len ){

			var max_index = byte_array.length - jpg_header_length - 4;
			var px_min = parseInt( max_index / len * j, 10 );
			var px_max = parseInt( max_index / len * ( j + 1 ), 10 );
			var delta = px_max - px_min;
			var px_i = parseInt( px_min + delta * seed, 10 );
			if ( px_i > max_index )
			{
				px_i = max_index;
			}
			var index = Math.floor( jpg_header_length + px_i );
			amount = 0;
			byte_array[index] = Math.floor( amount * 256 );

		},

		imageDataToBase64 : function( image_data, quality ){
			var q = typeof quality === 'number' && quality < 1 && quality > 0 ? quality : 0.1;
			console.log(image_data);
			ctx_2.putImageData( image_data, 0, 0 );
			return canvas_2.toDataURL( 'image/jpeg', q );
		},
		base64ToByteArray : function(str){

			var result = [ ];
			var digit_num;
			var cur;
			var prev;

			for (var i = 23, len = str.length; i < len; i++ )
			{
				cur = reversed_base64_map[ str.charAt( i ) ];
				digit_num = ( i - 23 ) % 4;

				switch ( digit_num )
				{
					// case 0: first digit - do nothing, not enough info to work with
					case 1: // second digit
						result.push( prev << 2 | cur >> 4 );
						break;

					case 2: // third digit
						result.push( ( prev & 0x0f ) << 4 | cur >> 2 );
						break;

					case 3: // fourth digit
						result.push( ( prev & 3 ) << 6 | cur );
						break;
				}

				prev = cur;
			}

			return result;
		},
		byteArrayToBase64 : function(arr){
			var result = [ 'data:image/jpeg;base64,' ];
			var byte_num;
			var cur;
			var prev;

			for (var i = 0, len = arr.length; i < len; i++ )
			{
				cur = arr[i];
				byte_num = i % 3;

				switch ( byte_num )
				{
					case 0: // first byte
						result.push( base64_map[ cur >> 2 ] );
						break;
					case 1: // second byte
						result.push( base64_map[( prev & 3 ) << 4 | ( cur >> 4 )] );
						break;
					case 2: // third byte
						result.push( base64_map[( prev & 0x0f ) << 2 | ( cur >> 6 )] );
						result.push( base64_map[cur & 0x3f] );
						break;
				}

				prev = cur;
			}

			if ( byte_num === 0 )
			{
				result.push( base64_map[( prev & 3 ) << 4] );
				result.push( '==' );
			}

			else if ( byte_num === 1 )
			{
				result.push( base64_map[( prev & 0x0f ) << 2] );
				result.push( '=' );
			}

			return result.join( '' );
		},
		getJpegHeaderSize : function( data ){
			var result = 417;
			 for(var i=0, len = data.length; i < len; i++){
			 	if( data[i] === 0xFF && data[i + 1] === 0xDA){
			 		result = i + 2;
			 		break;
			 	}
			 }
			return result;
		},
		resizeCanvas : function(canvas, size){
			if ( canvas.width !== size.width )
			{
				canvas.width = size.width;
			}

			if ( canvas.height !== size.height )
			{
				canvas.height = size.height;
			}
		},

		init : function(){

			my_canvas.width = 500;
			my_canvas.height = 500;
			var params = {
				quality : 1,
				iterations : Math.floor((Math.random() * 10)+1),
				seed : Math.random(),
				amount : Math.random(),
			};


			console.log(index);
			var my_image = document.getElementById('image'+ index);
			this.resizeCanvas(my_canvas, my_image);
			ctx.drawImage( my_image, 0,0 );
			var imgData = ctx.getImageData(0,0,my_canvas.width, my_canvas.height);
			this.glitchImageData(imgData, params);
		}
	};
}());

var index = Math.floor((Math.random() * 4)+1);
setInterval(function(){
	bitch.init();
},100);


