Validator({
  form: '#form-1',
  formGroupSelector: '.form-group', 
  errorSelector: '.form-message',
  rules: [
      Validator.isRequired('#YourName', 'Vui lòng nhập họ và tên'),
      Validator.isEmail('#YourEmail'),
      Validator.isRequired('#Phone', 'Vui lòng nhập số điện thoại'),    
      Validator.isRequired('#YourMessage', 'Vui lòng cho ý kiên'),    
  ],
  onSubmit: function(data) {
      //call API
      console.log(data);
  }
});