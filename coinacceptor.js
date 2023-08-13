const gpio = require('rpi-gpio');

const COIN_ACCEPTOR_PULSE_PIN = '';  // gpio pin

let balance = 0,
    coin = 0,
    timer = 0;

const render = () => {
    console.log(`balance: ${balance}`); //render balance
}

const addBalance = (num) => {
    console.log(`coin: ${num} UAH`)     // WARNING! This is not the denomination of the coin itself,
	balance += num;                     // but the amount received for the waitng period!
	render();
}

const acceptCoin = () => {              // receipt of the amount
	const returnCoin = () => {          
		addBalance(coin / 2);
		coin = 0;
	}
	coin += 1;
	clearTimeout(timer);
	timer = setTimeout(returnCoin, 300);
}

gpio.on('change', function (channel, value) {
    if(channel == COIN_ACCEPTOR_PULSE_PIN) {
			if (value) acceptCoin();
	}
});

gpio.setup(COIN_ACCEPTOR_PULSE_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);