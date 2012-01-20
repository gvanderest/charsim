/**
 * Ragnarok Online Character Simulator
 * @author Guillaume VanderEst <gui@exodus.io>
 * @package charsim
 */

/**
 * The base Charsim library/namespace. Base Charsim is sort of a static library object, most sub-prototypes are instantiatable
 */
Charsim = {
	// Constants
	VERSION : 'BETA',
	LEVEL_MIN : 1,
	LEVEL_MAX : 150,
	STAT_MIN : 1,
	STAT_MAX : 150,
	DEFAULT_LANGUAGE : 'en',

	// Library Functions
	stub : function(message){ if (console.log) { console.log('STUB: ' + message); } return undefined; },
};

/**
 * An array of language data, will autoload additional strings on-the-fly eventually-- used for all text strings for display
 * TODO: on-the-fly loading of other languages and testing fallbacks
 */
Charsim.Language = {
	'en' : {
		'str' : 'STR',
		'agi' : 'AGI',
		'vit' : 'VIT',
		'int' : 'INT',
		'dex' : 'DEX',
		'luk' : 'LUK',
		'byline' : 'Charsim (' + Charsim.VERSION + ') created by <a href="mailto:gui@exodus.io">Guillaume VanderEst</a> of <a href="http://exodus.io/" target="_blank">Exodus Labs</a>'
	}
}

Charsim.Character = function(options)
{
	this.name = '';
	this.stats = {};
	stats = ['str','agi','vit','int','dex','luk'];
	for (i in stats)
	{
		stat = stats[i];
		this.stats[stat] = new Charsim.Stat(this, stat);
	}
}

/**
 * A statistic for a character: STR, AGI, VIT, INT, DEX, LUK, but also: ASPD, FLEE, MATK, etc.
 * @param Charsim.Character character
 * @param string id the stat's identifier code ('str' for example)
 */
Charsim.Stat = function(character, id)
{
	this.character = character;
	this.id = id;

	this.base = 1;

	/**
	 * Get bonus by querying all equipment
	 * @return int
	 */
	this.get_bonus = function()
	{
		Charsim.stub('Calculation is currently not live');
		return 0;
	}

	this.set_base = function(amount)
	{
		this.base = parseInt(amount);
	}
	this.get_base = function()
	{
		return this.base;
	}

	this.get_total = function()
	{
		return this.base + this.get_bonus();
	}
	this.add = function(amount)
	{
		this.base += amount;
		if (this.base > Charsim.STAT_MAX)
		{
			this.base = Charsim.STAT_MAX;
		}
	}
	this.remove = function(amount)
	{
		amount = parseInt(amount);
		this.base -= amount;
		if (this.base < Charsim.STAT_MIN)
		{
			this.base = Charsim.STAT_MIN;
		}
	}
}

Charsim.View = function(origin, options)
{
	this.origin = origin;
	this.id = this.origin.attr('id');
	this.character = new Charsim.Character();
	this.language = Charsim.DEFAULT_LANGUAGE; // TODO: language overriding with options

	// find an element in this charsim
	this.find = function(selector)
	{
		return this.origin.find(selector);
	}

	this.get_string = function(field)
	{
		val = Charsim.Language[this.language][field] ? Charsim.Language[this.language][field] : Charsim.Language[this.language][field];
		return val ? val : field;
	}
	this._ = function(field) { return this.get_string(field); } // alias for get_string

	// refresh the list of stats
	this.refresh_stats = function()
	{
		for (i in this.character.stats)
		{
			stat = this.character.stats[i];
			console.log(stat);
		}
	}

	// if there is no ID on this 
	if (!this.id)
	{
		alert('The character simulator has been improperly initiated on a container without an ID.');
		return;
	}

	// if this is the first character simulator, include CSS file
	if ($('.charsim').length == 0)
	{
		this.origin.before('<link rel="stylesheet" type="text/css" href="charsim.css" />');
	}

	// for styles..
	this.origin.wrap('<div class="charsim-wrapper" />');
	this.origin.addClass('charsim');

	for (i in this.character.stats)
	{
		var stat = this.character.stats[i];
		this.origin.append('<div class="charsim-stat charsim-stat-' + stat.id + '" id="' + this.id + '-' + stat.id + '"><label>' + this._(stat.id) + '</label><var class="charsim-stat-base"><input type="text" value="" /></var><span class="plus">+</span><var class="charsim-stat-bonus"></var></div>');
		this.origin.append('<a href="' + stat.id + '" class="charsim-stat-up">+</a>');
		this.origin.append('<a href="' + stat.id + '" class="charsim-stat-down">&ndash;</a>');
	}	

	this.origin.find('.charsim-stat-up, .charsim-stat-down').click(function(e){
		e.preventDefault();
		// TODO: .. yeah
		Charsim.stub('Click handling not yet written');
	});

	this.origin.append('<div class="charsim-byline">' + this._('byline') + '</div> <!-- .charsim-byline -->');

	this.refresh_stats = function()
	{
		for (i in this.character.stats)
		{
			this.refresh_stat(i);
		}
	}

	this.refresh_stat = function(id)
	{
		console.log(id);
		stat = this.character.stats[id];
		this.find('.charsim-stat-' + id + ' .charsim-stat-base input').val(stat.get_base());
		this.find('.charsim-stat-' + id + ' .charsim-stat-bonus').html(stat.get_bonus());
		this.find('.charsim-stat-' + id + ' .charsim-stat-total').html(stat.get_total());
	}

	this.refresh_stats();
}


$.fn.charsim = function(options)
{
	charsim = new Charsim.View($(this), options);
	$(this).data('charsim', charsim);
};
