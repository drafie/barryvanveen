"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),GameOfLife=function(){var t=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"getPosition",value:function(t){var e=0,i=0;if(t.offsetParent)do e+=t.offsetLeft,i+=t.offsetTop;while(t=t.offsetParent);return[e,i]}},{key:"mod",value:function(t,e){return(e%t+t)%t}}]),t}(),e=function(){function e(t){_classCallCheck(this,e),this.config=t;var i,n=this.config.num_cols;for(this.cells=[],this.changes=[];n--;)for(this.cells[n]=[],i=this.config.num_rows;i--;)this.cells[n][i]=0}return _createClass(e,[{key:"changeCell",value:function(t,e){return this.cells[t][e]=!this.cells[t][e],this.cells[t][e]}},{key:"computeNextState",value:function(){var e,i,n,s,o,c,l=0;for(this.changes=[],e=this.config.num_cols;e--;)for(i=this.config.num_rows;i--;){for(l=0,s=-1;s<=1;++s)for(n=-1;n<=1;++n)0==s&&0==n||(o=e+s,(o<0||o>=this.config.num_cols)&&(o=t.mod(this.config.num_cols,o)),c=i+n,(c<0||c>=this.config.num_rows)&&(c=t.mod(this.config.num_rows,c)),this.cells[o][c]&&l++);(l<2||l>3)&&this.cells[e][i]?this.changes.push({col:e,row:i}):3!=l||this.cells[e][i]||this.changes.push({col:e,row:i})}return this.changes}}]),e}(),i=function(){function e(t,i){if(_classCallCheck(this,e),this.config=t,this.state=i,this.canvas=document.getElementById(this.config.canvas_id),null==this.canvas)throw new Error("Canvas element could not be found.");if(this.context=this.canvas.getContext("2d"),!this.context)throw new Error("Canvas context could not be retrieved.");this.canvas.width=this.config.num_cols*this.config.cell_size+1,this.canvas.height=this.config.num_rows*this.config.cell_size+1,this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle=this.config.color_cell_dead,this.context.strokeStyle=this.config.color_lines,this.context.fillRect(1,1,this.canvas.width-1,this.canvas.height-1);for(var n=0;n<=this.canvas.width;n+=this.config.cell_size)this.context.moveTo(.5+n,0),this.context.lineTo(.5+n,this.canvas.width);for(var s=0;s<=this.canvas.width;s+=this.config.cell_size)this.context.moveTo(0,.5+s),this.context.lineTo(this.canvas.width,.5+s);this.context.stroke()}return _createClass(e,[{key:"_handleClick",value:function(t){var e=this._getCellFromCursorPosition(t);if(0!=e){var i=this.state.changeCell(e[0],e[1]);this._drawCell(e[0],e[1],i)}}},{key:"_getCellFromCursorPosition",value:function(e){var i,n;"undefined"!=typeof e.pageX&&"undefined"!=typeof e.pageY?(i=e.pageX,n=e.pageY):(i=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop);var s=t.getPosition(this.canvas);return i-=s[0],n-=s[1],!(i>this.config.num_cols*this.config.cell_size||n>this.config.num_rows*this.config.cell_size)&&[Math.floor(i/this.config.cell_size),Math.floor(n/this.config.cell_size)]}},{key:"_drawCell",value:function(t,e,i){i?this.context.fillStyle=this.config.color_cell_alive:this.context.fillStyle=this.config.color_cell_dead,this.context.fillRect(1+t*this.config.cell_size,1+e*this.config.cell_size,this.config.cell_size-1,this.config.cell_size-1)}}]),e}(),n=function(){function t(n){_classCallCheck(this,t),this._defaults={canvas_id:"gameoflife_canvas",num_cols:80,num_rows:40,cell_size:10,color_lines:"#cccccc",color_cell_dead:"#ffffff",color_cell_alive:"#57A0DB",update_interval:50},this._interval=null,this.config=this._buildConfig(n),this.state=new e(this.config),this.canvas=new i(this.config,this.state),this._setEventListeners()}return _createClass(t,[{key:"_buildConfig",value:function(t){var e,i=this._defaults;if("object"!=("undefined"==typeof t?"undefined":_typeof(t)))return i;for(e in t)"undefined"!=typeof i[e]&&"object"!=_typeof(t[e])&&(i[e]=t[e]);return i}},{key:"_setEventListeners",value:function(){var t=this;this.canvas.canvas.addEventListener("click",function(e){t.canvas._handleClick(e)},!1)}},{key:"setState",value:function(t){var e,i;if(this.stop(),0!=t.length)for(e=0;e<t.length;e++)i=this.state.changeCell(t[e].col,t[e].row),this.canvas._drawCell(t[e].col,t[e].row,i)}},{key:"reset",value:function(){this.stop(),this.state=new e(this.config),this.canvas=new i(this.config,this.state)}},{key:"start",value:function(){if(null==this._interval){var t,e,i=this;this._interval=setInterval(function(){var n=i.state.computeNextState();if(0==n.length)return void i.stop();for(t=0;t<n.length;t++)e=i.state.changeCell(n[t].col,n[t].row),i.canvas._drawCell(n[t].col,n[t].row,e)},this.config.update_interval)}}},{key:"step",value:function(){var t,e,i;if(this.stop(),t=this.state.computeNextState(),0!=t.length)for(i=0;i<t.length;i++)e=this.state.changeCell(t[i].col,t[i].row),this.canvas._drawCell(t[i].col,t[i].row,e)}},{key:"stop",value:function(){clearInterval(this._interval),this._interval=null}}]),t}();return n}();
//# sourceMappingURL=maps/gameoflife.js.map
