document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const formSuccess = document.getElementById('form-success');

    // Funções de validação
    const validators = {
        nome: (value) => {
            if (!value.trim()) return 'Nome é obrigatório';
            if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
            return null;
        },
        
        email: (value) => {
            if (!value.trim()) return 'Email é obrigatório';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Email inválido';
            return null;
        },
        
        telefone: (value) => {
            if (!value.trim()) return 'Telefone é obrigatório';
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) return 'Telefone inválido';
            return null;
        },
        
        'tipo-servico': (value) => {
            if (!value) return 'Tipo de serviço é obrigatório';
            return null;
        },
        
        mensagem: (value) => {
            if (!value.trim()) return 'Mensagem é obrigatória';
            if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
            return null;
        }
    };

    // Função para mostrar erro
    const showError = (fieldId, message) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        field.classList.remove('success');
        field.classList.add('error');
        errorElement.textContent = message;
    };

    // Função para mostrar sucesso
    const showSuccess = (fieldId) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
    };

    // Função para validar campo individual
    const validateField = (fieldId) => {
        const field = document.getElementById(fieldId);
        const value = field.value;
        const validator = validators[fieldId];
        
        if (validator) {
            const error = validator(value);
            if (error) {
                showError(fieldId, error);
                return false;
            } else {
                showSuccess(fieldId);
                return true;
            }
        }
        return true;
    };

    // Função para validar todo o formulário
    const validateForm = () => {
        let isValid = true;
        
        Object.keys(validators).forEach(fieldId => {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });
        
        return isValid;
    };

    // Event listeners para validação em tempo real
    Object.keys(validators).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldId));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(fieldId);
                }
            });
        }
    });

    // Função para formatar telefone
    const formatPhone = (value) => {
        // Remove tudo que não é número
        const numbers = value.replace(/\D/g, '');
        
        // Aplica máscara para telefone angolano
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
        } else if (numbers.length <= 9) {
            return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
        } else {
            return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`;
        }
    };

    // Aplicar máscara de telefone
    const telefoneField = document.getElementById('telefone');
    if (telefoneField) {
        telefoneField.addEventListener('input', (e) => {
            const formatted = formatPhone(e.target.value);
            e.target.value = formatted;
        });
    }

    // Função para enviar formulário
    const submitForm = async (formData) => {
        try {
            // Simular envio (substitua pela sua integração real)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Aqui você pode integrar com EmailJS, Formspree ou outro serviço
            // Exemplo com EmailJS:
            /*
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                {
                    from_name: formData.get('nome'),
                    from_email: formData.get('email'),
                    from_phone: formData.get('telefone'),
                    company: formData.get('empresa'),
                    service_type: formData.get('tipo-servico'),
                    appointment_date: formData.get('data-agendamento'),
                    message: formData.get('mensagem')
                },
                'YOUR_USER_ID'
            );
            */
            
            return { success: true };
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            return { success: false, error: 'Erro ao enviar mensagem. Tente novamente.' };
        }
    };

    // Handler do formulário
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar formulário
        if (!validateForm()) {
            return;
        }
        
        // Preparar dados
        const formData = new FormData(contactForm);
        
        // Mostrar loading
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Enviar formulário
            const result = await submitForm(formData);
            
            if (result.success) {
                // Mostrar sucesso
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Resetar formulário
                contactForm.reset();
                
                // Limpar classes de validação
                Object.keys(validators).forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.classList.remove('error', 'success');
                    }
                });
                
                // Scroll para o topo da seção
                document.getElementById('contact').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            } else {
                throw new Error(result.error || 'Erro desconhecido');
            }
        } catch (error) {
            // Mostrar erro
            alert(error.message || 'Erro ao enviar mensagem. Tente novamente.');
        } finally {
            // Remover loading
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Função para resetar formulário
    const resetForm = () => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        
        // Limpar classes de validação
        Object.keys(validators).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.remove('error', 'success');
                const errorElement = document.getElementById(`${fieldId}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    };

    // Adicionar botão para enviar novo formulário
    const newFormBtn = document.createElement('button');
    newFormBtn.type = 'button';
    newFormBtn.className = 'btn btn-primary';
    newFormBtn.textContent = 'Enviar Nova Mensagem';
    newFormBtn.addEventListener('click', resetForm);
    
    formSuccess.appendChild(newFormBtn);
}); 