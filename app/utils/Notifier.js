import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class Notifier {
	constructor(onRegister, onNotification) {
		this.lastId = 0;
		this.lastChannelCounter = 0;

		PushNotification.createChannel({ channelId:"1", channelName:"Default" });

		NotificationHandler.attachRegister(onRegister);
		NotificationHandler.attachNotification(onNotification);

		PushNotification.getApplicationIconBadgeNumber(function(number) {
			if (number > 0) {
				PushNotification.setApplicationIconBadgeNumber(0);
			}
		});
	}

	popInitialNotification() {
		PushNotification.popInitialNotification();
	}

	// Shows a notification as soon as the function is called.
	localNotification(title, message) {
		PushNotification.localNotification({
			channelId: "1",
			autoCancel: true,
			largeIcon: "ic_launcher",
			smallIcon: "ic_notification",
			color: "purple",
			vibrate: true,
			vibration: 300,
			invokeApp: true,
			title: title,
			message: message
		});
	}

	// Schedules a notification for a later date.
	scheduleNotification(title, message, date) {
		this.lastId++;
		PushNotification.localNotificationSchedule({
			date: date,
			channelId: "1",
			autoCancel: true,
			largeIcon: "ic_launcher",
			smallIcon: "ic_notification",
			color: "purple",
			vibrate: true,
			vibration: 300,
			invokeApp: true,
			title: title,
			message: message
		});
	}

	// Repeats a notification at a given interval. The interval is determined by the initial date, and the repeatType. Since it's set to "day", the first notification is shown on the specified date, and then repeated every day at the same time every 24 hours.
	repeatNotification(title, message, date) {
		this.lastId++;
		PushNotification.localNotificationSchedule({
			date: date,
			channelId: "1",
			autoCancel: true,
			largeIcon: "ic_launcher",
			smallIcon: "ic_notification",
			color: "purple",
			vibrate: true,
			vibration: 300,
			invokeApp: true,
			title: title,
			message: message,
			repeatType: "day"
		});
	}

	checkPermission(callback) {
		return PushNotification.checkPermissions(callback);
	}

	requestPermissions() {
		return PushNotification.requestPermissions();
	}

	cancelNotif() {
		PushNotification.cancelLocalNotifications({ id:"" + this.lastId });
	}

	cancelAll() {
		PushNotification.cancelAllLocalNotifications();
	}

	abandonPermissions() {
		PushNotification.abandonPermissions();
	}

	getScheduledLocalNotifications(callback) {
		PushNotification.getScheduledLocalNotifications(callback);
	}
}