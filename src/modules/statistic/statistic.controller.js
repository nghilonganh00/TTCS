import { handleStatistic, handleStatisticByExamId, handleStatisticByPart } from './statistic.service';

const statisticByUserId = async (req, res) => {
  try {
    const { userId, timeFrame } = req.query;
    const analysis = await handleStatistic(userId, timeFrame);
    console.log('analysis: ', userId);
    return res.status(200).json({
      data: analysis,
      message: 'Internal server error',
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Internal server error',
    });
  }
};

const statisticByPart = async (req, res) => {
  try {
    const part = req.params.part;
    const { userId, timeFrame } = req.query;
    // console.log('part', part, userId, timeFrame);
    const statistic = await handleStatisticByPart(userId, timeFrame, part);
    return res.status(200).json({
      data: statistic,
      message: 'Get stastic by part successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Internal server error',
    });
  }
};

const statisticByExamId = async (req, res) => {
  try {
    const examId = req.params.id;
    const analysis = await handleStatisticByExamId(examId);
    console.log('examId: ', examId);
    return res.status(200).json({
      data: analysis,
      message: 'Get statistic by exam id successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Internal server error',
    });
  }
};
export default { statisticByUserId, statisticByPart, statisticByExamId };
