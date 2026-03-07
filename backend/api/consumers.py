import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'bus_updates'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket (Clients sending data)
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', {})
        action = text_data_json.get('action', 'update')

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'bus_message',
                'action': action,
                'message': message
            }
        )

    # Receive message from room group (Broadcasting to clients)
    async def bus_message(self, event):
        message = event['message']
        action = event.get('action', 'update')

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'action': action,
            'message': message
        }))
