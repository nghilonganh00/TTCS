import ExamDAO from '../exam/exam.DAO';
import ExamHistoryDAO from '../examHistory/examHistory.DAO';

const handleStatistic = async (userId, timeFrame) => {
  try {
    const examHistories = await ExamHistoryDAO.getByUserIdAndTimeFrame(userId, timeFrame);

    const spentTimeTotal = examHistories.reduce((total, examHistory) => total + examHistory.spentTime, 0);
    const correctTotal = examHistories.reduce((total, examHistory) => total + examHistory.correctTotal, 0);
    const questionTotal = examHistories.reduce((total, examHistory) => total + examHistory.questionTotal, 0);
    const accuracies = examHistories.map((examHistory) => examHistory.correctTotal / examHistory.questionTotal);
    const examSet = new Set();
    examHistories.forEach((examHistory) => examSet.add(examHistory.examId));
    const exams = [...examSet];
    return { examHistories, correctTotal, questionTotal, accuracies, spentTimeTotal, exams };
  } catch (error) {
    throw Error;
  }
};

const handleStatisticByPart = async (userId, timeFrame, part) => {
  try {
    const data = await ExamHistoryDAO.getByUserIdAndTimeFrame(userId, timeFrame);
    const examHistories = data.filter((examHistory) => examHistory.parts.includes(part));

    await Promise.all(
      examHistories.map(async (examHistory) => {
        const examTitle = await ExamDAO.getTitleById(examHistory.examId);
        examHistory.examTitle = examTitle;
      }),
    );

    const spentTimeTotal = examHistories.reduce((total, examHistory) => total + examHistory.spentTime, 0);
    const correctTotal = examHistories.reduce((total, examHistory) => total + examHistory.correctTotal, 0);
    const questionTotal = examHistories.reduce((total, examHistory) => total + examHistory.questionTotal, 0);
    const accuracies = examHistories.map((examHistory) => examHistory.correctTotal / examHistory.questionTotal);
    const examSet = new Set();
    examHistories.forEach((examHistory) => {
      // const
      examSet.add(examHistory.examId);
    });
    const exams = [...examSet];
    return { examHistories, correctTotal, questionTotal, accuracies, spentTimeTotal, exams };
  } catch (error) {
    throw Error;
  }
};

const handleStatisticByExamId = async (examId) => {
  try {
    const examHistories = await ExamHistoryDAO.getByExamId(examId);

    const spentTimeTotal = examHistories.reduce((total, examHistory) => total + examHistory.spentTime, 0);

    const correctTotal = examHistories.reduce((total, examHistory) => total + examHistory.correctTotal, 0);

    const questionTotal = examHistories.reduce((total, examHistory) => total + examHistory.questionTotal, 0);

    const accuracies = examHistories.map((examHistory) => examHistory.correctTotal / examHistory.questionTotal);

    const examSet = new Set();
    const exams = [...examSet];

    return { examHistories, correctTotal, questionTotal, accuracies, spentTimeTotal, exams };
  } catch (error) {
    throw error;
  }
};

export { handleStatistic, handleStatisticByPart, handleStatisticByExamId };
