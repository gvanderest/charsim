/**
 * Ragnarok Online Character Simulator
 * @author Guillaume VanderEst <gui@exodus.io>
 * @package charsim
 */

Charsim = {
	version : 'BETA',
	stub : function(message){ if (console.log) { console.log('STUB: ' + message); } return undefined; },
	add_to_stat : function(character, stat, amount) { if (character.stats[stat].base < 99) { character.stats[stat].base += amount; } }
};


Charsim.handle = function(event_name, obj) { 
	alert('click ' + obj.attr('id'));
};

Charsim.Character = function(options)
{
	this.name = '';
	this.stats = {};
	stats = ['str','agi','vit','int','dex','luk'];
	for (i in stats)
	{
		stat = stats[i];
		this.stats[stat] = new Charsim.Stat(stat);
	}
}

Charsim.Stat = function(id, options)
{
	this.id = id;
	this.base = 1;
	this.bonus = 0;

	this.calculate_bonus = function()
	{
		return Charsim.stub('Calculate not done yet');
	}
	this.get_total = function()
	{
		return this.base + this.bonus;
	}
}

Charsim.View = function(origin, options)
{
	this.origin = origin;
	this.id = this.origin.attr('id');
	this.character = new Charsim.Character();

	// if there is no ID on this 
	if (!this.id)
	{
		alert('The character simulator has been improperly initiated on a container without an ID.');
		return;
	}
	this.origin.addClass('charsim');

	// if this is the first character simulator, include CSS file
	if ($('.charsim').length == 0)
	{
		this.origin.before('<link rel="stylesheet" type="text/css" href="charsim.css" />');
	}

	for (i in this.character.stats)
	{
		var stat = this.character.stats[i];
		this.origin.append('<div class="charsim-stat charsim-stat-' + stat + '" id="' + this.id + '-' + stat.id + '"><label>' + stat.id + '</label><var><input type="text" value="' + stat.get_total() + '" /></var></div>');
		this.origin.append('<a href="#" class="charsim-stat-up" id="' + this.id + '-' + stat.id + '-up">+</a>');
		this.origin.append('<a href="#" class="charsim-stat-down" id="' + this.id + '-' + stat.id + '-down">&ndash;</a>');
	}	

	this.origin.find('.charsim-stat-up').click(function(e){
		e.preventDefault();
		Charsim.handle('click', $(this));
	});

	this.origin.append('<div class="charsim-byline">Charsim (' + Charsim.version + ') created by <a href="mailto:gui@exodus.io">Guillaume VanderEst</a> of <a href="http://exodus.io/" target="_blank">Exodus Labs</a></div> <!-- .charsim-byline -->');

	this.update_stat = function(id)
	{
		this.origin.find('charsim-stat-' + id).val(this.character.stats[id].base);
	}
}


$.fn.charsim = function(options)
{
	charsim = new Charsim.View($(this), options);
	$(this).data('charsim', charsim);
};
