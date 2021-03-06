define(function() {

		return {

			getPanels: function(editor){
				if(!this.panels)
					this.panels = editor.Panels.getPanelsEl();
				return this.panels;
			},

			run: function(editor, sender) {
				if(sender)
					sender.set('active',false);
				editor.stopCommand('sw-visibility');
				var that = this;
				var panels = this.getPanels(editor);
				var canvas = editor.Canvas.getElement();
				var editorEl = editor.getEl();
				var pfx = editor.Config.stylePrefix;
				if(!this.helper) {
					this.helper = document.createElement('span');
					this.helper.className = pfx + 'off-prv fa fa-eye-slash';
					editorEl.appendChild(this.helper);
					this.helper.onclick = function(){
						that.stop(editor);
					};
				}
				this.helper.style.display = 'inline-block';

				panels.style.display = 'none';
				var canvasS = canvas.style;
				canvasS.width = '100%';
				canvasS.height = '100%';
				canvasS.top = '0';
				canvasS.left = '0';
				canvasS.padding = '0';
				canvasS.margin = '0';
			},

			stop: function(editor, sender) {
				var panels = this.getPanels(editor);
				editor.runCommand('sw-visibility');
				editor.getModel().runDefault();
				panels.style.display = 'block';
				var canvas = editor.Canvas.getElement();
				canvas.setAttribute('style', '');
				if(this.helper) {
					this.helper.style.display = 'none';
				}
			}
		};
	});