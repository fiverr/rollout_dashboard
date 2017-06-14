const Notification = (window as any).Notification;

export default class Notifications {

    public static requestPermissions() {
        if (!Notification) { return; }
        if (Notification.permission === 'granted') { return; }

        Notification.requestPermission();
    }

    public static send(title: string, body: string) {
        if (!Notification) { return; }

        new Notification(title, {
            icon: '/gear.png',
            body,
        });
    }
};
