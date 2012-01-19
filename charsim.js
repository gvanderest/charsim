/**
 * Ragnarok Online Character Simulator
 * @author Guillaume VanderEst <gui@exodus.io>
 * @package charsim
 */

Charsim = {
	version : 'BETA'
};

Charsim.Constructor = function(options)
{
	this.character = new Charsim.Character();
	this.derp = 'herp';
}

Charsim.Character = function(options)
{
	this.name = '';
}


$.fn.charsim = function(options)
{
	charsim = new Charsim.Constructor(options);
	$(this).data('charsim', charsim);

	// if this is the first character simulator, include CSS file
	if ($('.charsim').length == 0)
	{
		$(this).before('<link rel="stylesheet" type="text/css" href="charsim.css" />');
	}

	$(this).addClass('charsim');
	$(this).append('<div class="charsim-byline">Charsim (' + Charsim.version + ') created by <a href="mailto:gui@exodus.io">Guillaume VanderEst</a> of <a href="http://exodus.io/" target="_blank">Exodus Labs</a></div> <!-- .charsim-byline -->');
};
