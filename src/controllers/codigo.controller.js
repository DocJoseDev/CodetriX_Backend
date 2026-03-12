const getCodigoV1 = (req, res) => {
  res.status(200).json({
    endpoint: 'codigov1',
    message: 'Endpoint codigov1 funcionando correctamente',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getCodigoV1
};
