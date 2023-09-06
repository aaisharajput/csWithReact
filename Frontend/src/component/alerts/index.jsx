import getRoute from '../../server';

export function setMoreDetailsAlert(item) {
    return _ => {
        moreDetails(item);
    }
}

export function moreDetails(more) {
    let span = `
            <div class="row pt-3 w-100">
                <div class="col-12 col-md-4">
                    <img id="p_img" src=${getRoute('/images/'+more.img)} style="height: 90%;">
                </div>
                <div class="col-12 col-md-8" style="color:black">
                    <div class="row">
                        <div class="col-4 col-md-4 d-flex justify-content-end">
                            <p>Color :</p>
                        </div> 
                        <div class="col-8 col-md-8 d-flex justify-content-start">
                            <p>${more.color}</p>
                        </div>
                        <div class="col-4 col-md-4 d-flex justify-content-end"><p>Price :</p></div> <div class="col-8 col-md-8 d-flex justify-content-start"><p>Rs. ${more.price}</p></div>
                        <div class="col-4 col-md-4 d-flex justify-content-end">
                            <p>Product Details :</p>
                        </div> 
                        <div class="col-8 col-md-8 d-flex justify-content-start">
                            <textarea rows="8"class="form-control" style="background:#fff;border:none" disabled>${more.p_details}</textarea>
                        </div>                  
                    </div>
                </div>              
            </div> 
            `;

    Swal.fire({
        title: more.p_name,
        width: 1000,
        html: span,
    })
}