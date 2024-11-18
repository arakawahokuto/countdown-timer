import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";

function App() {
	const [pastaType, setPastaType] = useState(null); // パスタの種類
	const [firmness, setFirmness] = useState(null); // 固さ
	const [timeLeft, setTimeLeft] = useState(null); // タイマーの残り時間
	const [isRunning, setIsRunning] = useState(false); // タイマーの状態
	const [isCompleted, setIsCompleted] = useState(false); // タイマーの完了状態

	// パスタの種類と固さに応じた調理時間（秒数）
	const pastaTimes = {
		"1.4mm": { hard: 420, normal: 480, soft: 540 },
		"1.6mm": { hard: 480, normal: 540, soft: 600 },
		"1.8mm": { hard: 540, normal: 600, soft: 660 },
		"macaroni": { hard: 600, normal: 660, soft: 720 },
		"penne": { hard: 720, normal: 780, soft: 840 },
		"fettuccine": { hard: 660, normal: 720, soft: 780 },
	};

	// 選択肢リスト
	const pastaOptions = ["1.4mm", "1.6mm", "1.8mm", "macaroni", "penne", "fettuccine"];
	const firmnessOptions = ["hard", "normal", "soft"];

	// パスタの種類や固さが選択された時点で調理時間を設定
	const updateTimeLeft = (type, level) => {
		if (type && level && pastaTimes[type] && pastaTimes[type][level]) {
			setTimeLeft(pastaTimes[type][level]);
			setIsCompleted(false); // 新しい選択時に完了状態をリセット
		}
	};

	// パスタの種類を選択
	const handlePastaTypeChange = (type) => {
		setPastaType(type);
		updateTimeLeft(type, firmness);
	};

	// 固さを選択
	const handleFirmnessChange = (level) => {
		setFirmness(level);
		updateTimeLeft(pastaType, level);
	};

	// スタートボタンを押したときにタイマーを開始
	const startTimer = () => {
		if (timeLeft > 0) {
			setIsRunning(true);
		}
	};

	// ストップボタンを押したときにタイマーを一時停止
	const stopTimer = () => {
		setIsRunning(false);
	};

	// クリアボタンを押したときにタイマーと選択をリセット
	const clearTimer = () => {
		setPastaType(null);
		setFirmness(null);
		setTimeLeft(null);
		setIsRunning(false);
		setIsCompleted(false);
	};

	// タイマーのカウントダウン
	useEffect(() => {
		if (isRunning && timeLeft > 0) {
			const intervalId = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
			return () => clearInterval(intervalId); // クリーンアップ
		} else if (timeLeft === 0 && isRunning) {
			setIsRunning(false);
			setIsCompleted(true); // タイマーが0になったら完了状態をtrueに設定
		}
	}, [isRunning, timeLeft]);

	return (
		<div className="p-timer">
			<h1 className="c-heading-01">パスタイマー</h1>
			<div className="p-timer__item">
				<div className="p-timer__pasta-group">
					<h2 className="c-heading-02">麺の種類</h2>
					{/* パスタの種類選択ボタン */}
					<div className="p-timer__pasta-wrap p-timer__pasta-type-wrap">
						{pastaOptions.map((type) => (
							<button
								key={type}
								className={pastaType === type ? "selected" : ""}
								onClick={() => handlePastaTypeChange(type)}
							>
								{type === "1.4mm" ? "1.4mm" : type === "1.6mm" ? "1.6mm" : type === "1.8mm" ? "1.8mm" : type === "macaroni" ? "マカロニ" : type === "penne" ? "ペンネ" : "フェットチーネ"}
							</button>
						))}
					</div>
				</div>

				<div className="p-timer__pasta-group">
					<h2 className="c-heading-02">麺の固さ</h2>
					{/* 固さの選択ボタン */}
					<div className="p-timer__pasta-wrap p-timer__pasta-firmness-wrap">
						{firmnessOptions.map((level) => (
							<button
								key={level}
								className={firmness === level ? "selected" : ""}
								onClick={() => handleFirmnessChange(level)}
							>
								{level === "hard" ? "固め" : level === "normal" ? "普通" : "柔らかめ"}
							</button>
						))}
					</div>
				</div>

				{/* スタート・ストップ・クリアボタン */}
				<div className="p-timer__pasta-btn-wrap">
					<button onClick={startTimer} disabled={!pastaType || !firmness || isRunning}>
						スタート
					</button>
					<button onClick={stopTimer} disabled={!isRunning}>
						ストップ
					</button>
					<button onClick={clearTimer}>
						クリア
					</button>
				</div>

				{/* タイマー表示 */}
				<div className="p-timer__item-primary">
					{timeLeft !== null ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}` : "00:00"}
				</div>

				{/* タイムアップのメッセージ */}
				{isCompleted && <p className="p-timer__complete-text">パスタが茹で上がりました！</p>}
			</div>
		</div>
	);
}

export default App;
