import { EVENT_TYPES } from '$lib/types/event/even-type.type';
import type { Event } from '$lib/types/event/event.interface';

export const overview: Event = {
	price: null,
	claimable: true,
	dateCreated: '06/05/2023',
	description: 'This is the first mock',
	eventId: '45363',
	extraMetadata: { key: 'string' },
	groups: ['TRY'],
	host: 'Twitter',
	image: 'string',
	name: 'Ignacio Debat',
	totalSupply: '2,306',
	transferrable: false,
	url: 'https://www.google.com.uy/',
	verifiers: [{ dateStart: '06/05/2023', dateEnding: '06/20/2023' }],

	// Added by Chino
	eventType: EVENT_TYPES[1]
};
