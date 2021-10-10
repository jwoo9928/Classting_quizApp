import { Alert } from 'react-native';

interface OneButtonAlertProps {
	title?: string;
	message: string;
	function_ok: () => void;
}

interface TwoButtonAlertProps extends OneButtonAlertProps {
	text_cancel: string;
	text_ok: string;
	function_cancel?: () => void;
}

export const createOneButtonAlert = ({
	title = '',
	message,
	function_ok,
}: OneButtonAlertProps) => {
	Alert.alert(title, message, [
		{
			text: '확인',
			onPress: () => {
				function_ok();
			},
		},
	]);
};

export const createTwoButtonAlert = ({
	title = '',
	message,
	text_cancel,
	text_ok,
	function_cancel,
	function_ok,
}: TwoButtonAlertProps) => {
	Alert.alert(title, message, [
		{
			text: text_cancel,
			onPress: () => {
				if (function_cancel) function_cancel();
			},
			style: 'cancel',
		},
		{
			text: text_ok,
			onPress: () => {
				function_ok();
			},
		},
	]);
};
