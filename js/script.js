// pagina principal -----------------------------------------------------------------------------------------------------------
$('#services-button').on('click', function (e) {
    e.stopPropagation(); // Prevents click event from bubbling up to the document

    var $submenu = $('#services-submenu');

    if ($submenu.is(':visible')) {
        $submenu.slideUp();
        $('.fa-caret-down').css('transform', 'rotate(0deg)');
    } else {
        $submenu.slideDown();
        $('.fa-caret-down').css('transform', 'rotate(180deg)');
    }
});

$(document).on('click', function (e) {
    if (!$(e.target).closest('#services-button, #services-submenu').length) {
        $('#services-submenu').slideUp();
        $('.fa-caret-down').css('transform', 'rotate(0deg)');
    }
});

$(document).on('click', '.nav button', function () {
    $('.nav button').removeClass('active');
    $(this).addClass('active');
});

$(document).on('click', '.nav-link', function () {
    $.ajax({
        url: $(this).data('pages') + '.html',
        type: 'GET',
        success: function (response) {
            $('#main').html(response);
        }
    })
})

// pagina de creacion de la venta -----------------------------------------------------------------------------------------------
$(document).on('click', '.btn.primary', function (e) {
    var $form = $('.grid');
    if ($form[0].checkValidity()) {
        $form.submit();
    } else {
        $form[0].reportValidity();
    }
    e.preventDefault();
});

$(document).on('click', '.btn.afiliado', function () {
    $('.modal').addClass('open');
})

var afiliadoCount = 0;
$(document).on('click', '#agregar-afiliado', function () {
    var container = $('.modal');
    var numAfiliados = container.children().length;

    if (numAfiliados <= 8) {
        afiliadoCount++;
        var index = numAfiliados;
        let html = `
                    <div class="afiliado"
                        style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 10px;">
                        <h2 style="grid-column: span 4;">Afiliado ${index}</h2>
                        <div class="field">
                            <label>
                                Nombres
                                <input name="afiliado[${index}][nombre]" class="required-afiliado" placeholder="Ingresa los nombres" />
                            </label>
                        </div>

                        <div class="field">
                            <label>
                                Apellidos
                                <input name="afiliado[${index}][apellido]" class="required-afiliado" placeholder="Ingresa los apellidos" />
                            </label>
                        </div>

                        <div class="field">
                            <label>
                                Tipo de Documento
                                <select class="tipo-doc-select required-afiliado" name="afiliado[${index}][tipo-documento]">
                                    <option value=""></option>
                                    <option value="cedula">Cédula</option>
                                    <option value="pasaporte">Pasaporte</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </label>
                        </div>

                        <div class="field">
                            <label>
                                Fecha de Nacimiento
                                <input type="date" name="afiliado[${index}][fecha-nacimiento]" class="required-afiliado">
                            </label>
                        </div>

                        <div class="field">
                            <label>
                                Parentesco
                                <select name="afiliado[${index}][parentesco]" class="required-afiliado">
                                    <option value=""></option>
                                    <option value="madre">Madre</option>
                                    <option value="padre">Padre</option>
                                    <option value="hermano(a)">Hermano(a)</option>
                                    <option value="hijo(a)">Hijo(a)</option>
                                    <option value="conyuge">Cónyuge</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </label>
                        </div>

                        <div class="field">
                            <label>
                                Departamento
                                <select class="departamento-select required-afiliado" data-target=".ciudad-select" name="afiliado[${index}][departamento]">
                                    <option value=""></option>
                                </select>
                            </label>
                        </div>

                        <div class="field">
                            <label>
                                Ciudad
                                <select class="ciudad-select required-afiliado" name="afiliado[${index}][ciudad]">
                                    <option value=""></option>
                                </select>
                            </label>
                        </div>

                        <div class="field">
                            <label for="direccion">Dirección</label>
                            <textarea name="afiliado[${index}][direccion]" class="required-afiliado" placeholder="Ingresa la dirección"></textarea>
                        </div>
                        <button class="btn eliminar-afiliado">Eliminar Afiliado</button>
                    </div>`;
        container.append(html);
        // fillDepartamentoSelects(); 
        // precio(afiliadoCount, plan);
    } else {
        alert('No se pueden agregar más de 8 afiliados.');
    }

    $(document).on('click', '.btn.eliminar-afiliado', function () {
        $(this).parent().remove();
        afiliadoCount--;
    });
});

$(document).on('click', '.btn.close', function () {
    $('.modal').removeClass('open');
});

// pagina modificacion de venta -------------------------------------------------------------------------------------------------
$(document).on('click', '.action-button.show-button', function () {
    $('.modal-info').addClass('open');
})

$(document).on('click', '.modal-close-button', function () {
    $('.modal-info').removeClass('open');
})

// ------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const menuButtons = document.querySelectorAll('.action-menu-button');

    menuButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const menu = this.nextElementSibling;
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';

            // Ocultar otros menús
            document.querySelectorAll('.action-menu').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.style.display = 'none';
                }
            });

            event.stopPropagation();
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.action-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
});
