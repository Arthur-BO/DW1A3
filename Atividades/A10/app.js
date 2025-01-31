const masks = {
    cpf(value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    },
  
    cnpj(value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    },
  
    phone(value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
    },
  
    cep(value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
    },
  
    hour(value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1:$2')
        .replace(/(:\d{2})\d+?$/, '$1');
    }
  };
  
  const validators = {
    cpf(value) {
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value); // Validação CPF
    },
    
    cnpj(value) {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value); // Validação CNPJ
    },
    
    phone(value) {
      return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(value); // Validação telefone
    },
    
    cep(value) {
      return /^\d{5}-\d{3}$/.test(value); // Validação CEP
    },
    
    hour(value) {
      return /^\d{2}:\d{2}$/.test(value); // Validação Hora
    }
  };
  
  document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js;
    
    $input.addEventListener('input', e => {
      const value = e.target.value;
      e.target.value = masks[field](value);
  
      const isValid = validators[field](e.target.value);
      
      if (!isValid) {
        e.target.style.border = "2px solid red";
      } else {
        e.target.style.border = "2px solid green";
      }
    }, false);
  });