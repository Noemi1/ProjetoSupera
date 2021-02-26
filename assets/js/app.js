// Abrir/fechar menu
function menuTrigger() {
    $('.menu').toggleClass('menu--open');
    $('.btn-menu').toggleClass('menu--open');
    $('.menu-content').toggleClass('menu--open');
}

// Contato input
function contatoTipoChange(el) {
    let valor = $(el).val();
    let inputNextContact = $(el).parents('.linha').find('.inputForm[data-input]');
    switch (valor) {
        case 'Celular':
            $(inputNextContact).removeClass('tel');
            $(inputNextContact).attr('placeholder', '(00) 0.0000-0000');
            $(inputNextContact).attr('type', 'text');
            break;
        case 'Telefone':
            $(inputNextContact).removeClass('cel');
            $(inputNextContact).attr('placeholder', '(00) 0000-0000');
            $(inputNextContact).attr('type', 'text');
            break;
        case 'Email':
            $(inputNextContact).removeClass('cel');
            $(inputNextContact).removeClass('tel');
            $(inputNextContact).attr('placeholder', 'example@hotmail.com.br');
            $(inputNextContact).attr('type', 'email');
            break;
    }

}
// Fechar menu lateral
function closeForm(el) {
    var form = $(el).parents('form');
    resetForm(form);
    $(el).parents('.asideForm').removeClass('asideForm--open')
    $('.openAsideForm-content').show(400);
}

// Limpar campos do form
function resetForm(form) {
    $(form)[0].reset();
}

// Cadastrar unidade
function novaUnidade(el) {
    var form = $(el).parents('.asideForm').find('form');
    resetForm(form);
    openAsideForm();
}

// Abri menu lateral
function openAsideForm() {
    $('.asideForm').addClass('asideForm--open');
    $('.openAsideForm-content').hide(400);
}

// Adicionar novo contato

function createLinhaContato(el) {
    $(el).parents('.contato').find('.camposContato').append(`
         <div class="linha">
            <div class="input-container col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                <p class="text-error"></p>
                <label for="DataFechamento">Tipo:</label>
                <select name="ContatoTipo" id="ContatoTipo" class="inputForm" onchange="contatoTipoChange(this)" required>
                    <option value="Celular">Celular</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Email">E-mail</option>
                </select>
            </div>
            <div class="input-container col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7">
                <p class="text-error"></p>
                <label for="Contato">Contato:</label>
                <input type="text" name="Contato" id="Contato" class="inputForm cel" placeholder="(00) 0.0000-0000" data-input required>
            </div>
            <div class="input-container">
                <button class="btn btn-excluirLinha" onclick="deleteLinhaContato(this)" title="Remover linha">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `);
    ordenarListaContatos($(el).parents('.contato').find('.camposContato'))
}


function ordenarListaContatos(parent) {
    $(parent).children('.linha').each((index, el) => {
        $(el).find('.inputForm').each((i, input) => {
            let idAttribute = $(input).attr('id').split('-')[0];
            $(input).attr('id', `${idAttribute}-${index}`)
            $(input).attr('name', `${idAttribute}[${index}]`);

        });
    });
}

function deleteLinhaContato(el) {
    $(el).parents('.linha').remove();
    ordenarListaContatos($('.camposContato'));
}


function ordenarPorColuna(el) {
    if ($(el).is('.asc')) {
        $(el).removeClass('asc');
        $(el).addClass('desc selected');
        sortOrder = -1;
    } else {
        $(el).addClass('asc selected');
        $(el).removeClass('desc');
        sortOrder = 1;
    }

    $(el).siblings().removeClass('asc selected');
    $(el).siblings().removeClass('desc selected');
    var arrData = $(el).parents('.table').find('tbody > tr:has(td)').get(); // Pega todas as linhas da tabela que possuem colunas

    arrData.sort(function(a, b) {
        var val1 = $(a).children('td').text().toUpperCase();
        var val2 = $(b).children('td').text().toUpperCase();

        if ($.isNumeric(val1) && $.isNumeric(val2)) {
            return sortOrder == 1 ? val1 - val2 : val2 - val1;
        } else {
            return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
        }
    });

    $.each(arrData, function(index, row) {
        $(el).parents('.table').find('tbody').append(row);
    });
}

$('.cel').mask('(00) 9.0000-0000');
$('.tel').mask('(00) 0000-0000');
$('.cnpj').mask('00.000.000/0000-00');
$('.cpf').mask('000.000.000-00');
$('.rg').mask('00.000.000-00');
$('.cep').mask('00000-000');


$('.table tbody td').hover(function() {
    let columnAtribute = $(this).attr('column');
    $('td').removeClass('td-hover');
    $('.table tbody td[column=' + columnAtribute + ']').addClass('td-hover');
});

$('.table tbody td').mouseout(function() {
    $('td').removeClass('td-hover');
});

function selectLinha(el, id) {
    let linhasLen = $(el).parents('tbody').find('.checkboxList-input:checked').length;
    if (linhasLen > 0) {
        $(el).parents('.table').find('.subheader').slideDown(0);
    } else {
        $(el).parents('.table').find('.subheader').slideUp(0);
    }
    $(el).parents('.table').find('.qtd-linhas').html(`${linhasLen} Linhas selecionadas`);

}

function excluirLinha(el) {
    let linhasLen = $(el).parents('.table').find('.checkboxList-input:checked').length;
    $(el).parents('.table').find('.checkboxList-input:checked').each(function() {
        console.log($(this).parents('tr'));
        $(this).parents('tr').remove();
    });

    linhasLen = $(el).parents('.table').find('.checkboxList-input:checked').length;
    if (linhasLen > 0) {
        $(el).parents('.table').find('.subheader').slideDown(0);
    } else {
        $(el).parents('.table').find('.subheader').slideUp(0);
    }
    $(el).parents('.table').find('.qtd-linhas').html(`${linhasLen} Linhas selecionadas`);
}


function editLinha(el) {
    let form = $('form');
    resetForm(form);
    openAsideForm();

    $('#RazaoSocial').val('Bullest Soluções em Tecnologia');
    $('#CNPJ').val('12.123.123/1234-12');
    console.log(new Date().toISOString().split('T')[0])
    $('#DataCompra').val(new Date().toISOString().split('T')[0]);
    $('#DataInauguracao').val(new Date().toISOString().split('T')[0]);
    $('#DataFechamento').val(new Date().toISOString().split('T')[0]);
    $('#CEP').val('02808-000');
    $('#Logradouro').val('Xavier da Silva Ferrão');
    $('#Numero').val('246');
    $('#Bairro').val('Sítio Morro Grande');
    $('#Cidade').val('São Paulo');
    $('#Complemento').val('Casa');

    $('.camposContato').html('');

    $('.btn-addLinha').click();
    $('.btn-addLinha').click();
    $('.btn-addLinha').click();

    $('#ContatoTipo-0 option[value=Email]').attr('selected', true);
    $('#ContatoTipo-0').trigger('change');
    $('#Contato-0').val('bullest@contato.com.br');

    $('#ContatoTipo-1 option[value=Celular]').attr('selected', true);
    $('#ContatoTipo-1').trigger('change');
    $('#Contato-1').val('(11) 9.5346-3376');

    $('#ContatoTipo-2 option[value=Telefone]').attr('selected', true);
    $('#ContatoTipo-2').trigger('change');
    $('#Contato-2').val('(11) 3971-9160');

}
// Pesquisa CEP
function pesquisaCEP(el) {
    $('.cep-loading').fadeIn(400);
    let cep = $(el).val().replace('-', '');

    if (cep.trim() == '') {
        $(el).parent('.input-container').find('p.text-error').text('Preencha esse campo para fazer a pesquisa por CEP');
        $('.cep-loading').hide(0);
        return;
    }
    $.ajax({
        url: `https://viacep.com.br//ws/${cep}/json/`,
        type: 'GET',
        success: function(data) {
            if (data.erro == true) {
                $(el).parent('.input-container').find('p.text-error').text('Este CEP é inválido!');
            } else {
                populaEndereco(data)
                $('.cep-loading').hide(0);
            }


        },
        error: function(data) {
            $(el).parent('.input-container').find('p.text-error').text('Este CEP é inválido!');
            $('.cep-loading').hide(0);
        },
    })
}

function populaEndereco(json) {
    if (json.logradouro == '' || json.logradouro == undefined) {
        $('#Logradouro').val('Logradouro');
    } else {
        let logradouroArray = json.logradouro.split(' ');
        let logradouroTipo = logradouroArray[0];

        if (logradouroArray[1] == 'Particular' || logradouroArray[1] == 'Sanitária') {
            logradouroTipo = logradouroArray[0] + ' ' + logradouroArray[1];
            logradouroArray.splice(0, 1)
            logradouroArray.splice(0, 1)
        }
        if (logradouroArray.length < 1) {
            $('#Logradouro').val('Logradouro')
        } else {
            $('#Logradouro').val(logradouroArray.join(' '))
        }
        $('#LogradouroTipo_Id option').attr('selected', false);
        $('#LogradouroTipo_Id option[value="' + logradouroTipo + '"]').attr('selected', true);
        $('#LogradouroTipo_Id').trigger('change')
        $('#LogradouroTipo_Id').change();
    }

    if (json.bairro == '' || json.bairro == undefined) {
        $('#Bairro').val('Bairro');
    } else {
        $('#Bairro').val(json.bairro);
    }

    if (json.cidade == '' || json.cidade == undefined) {
        $('#Cidade').val('Cidade');
    } else {
        $('#Cidade').val(json.cidade);
    }

    $('#Complemento').val(json.complemento);

    $('#UF option').attr('selected', false);
    $('#UF option[value="' + json.uf + '"]').attr('selected', true);
    $('#UF').trigger('change')
    $('#UF').change();

}

// Campos obrigatórios
$('.inputForm[required]').focusout(function() {
    if ($(this).val().trim() == '' || $(this).val() == undefined) {
        $(this).parent('.input-container').find('p.text-error').text('Esse campo é obrigatório!')
    } else {
        $(this).parent('.input-container').find('p.text-error').text('')

    }
})

// Remove sinais de campos CPJCNPJ, CEP, etc 
function formataCampos(e, el) {
    e.preventDefault();

    // CPFCNPJ
    let campo = $(el).parents('form').find('#CPFCNPJ').val().replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');
    $(el).parents('form').find('#CPFCNPJ').val(campo);

    // CPFCNPJ
    campo = $(el).parents('form').find('#CEP').val().replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');
    $(el).parents('form').find('#CEP').val(campo);

    $(el).parents('form').submit();
}


// Barra de Progresso
function fnProgressBarLoading() {
    NProgress.start();
    window.addEventListener("load", function(event) {
        NProgress.done();
    });
}
fnProgressBarLoading()